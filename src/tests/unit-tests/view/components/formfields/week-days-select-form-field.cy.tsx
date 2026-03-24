import type { WeekDaysSelectFormParams } from "@/domain/components/formfields/week-days-select-form-field";
import { WeekDaysSelectForm } from "@/view/components/formfields/week-days-select-form-field";
import { Button } from "@/view/components/ui/button";
import { Form } from "@/view/components/ui/form";
import "@/view/styles/globals.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

describe("<WeekDaysSelectForm />", () => {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const FormMock = (params: Omit<WeekDaysSelectFormParams<any>, "form" | "formFieldName">) => {
		const schema = z.object({
			days: z.array(z.string()).min(1),
		});
		const form = useForm({
			values: {
				days: [],
			},
			mode: "onSubmit",
			resolver: zodResolver(schema),
		});
		function onSubmit(data: {
			days: string[];
		}) {
			return data.days;
		}
		return (
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="m-2 flex gap-2">
					<WeekDaysSelectForm form={form} formFieldName="days" {...params} />
					<Button type="submit">submit</Button>
				</form>
			</Form>
		);
	};
	const weekDays = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
	it("should render seven buttons one for each days of week", () => {
		cy.mount(<FormMock />);
		for (const dayName of weekDays) {
			cy.get(`button[id=${dayName}]`).should("exist").should("have.text", dayName[0].toUpperCase());
		}
	});
	it("should change color of selected days", () => {
		cy.mount(<FormMock />);
		for (const dayName of weekDays) {
			const currentDay = cy.get(`button[id=${dayName}]`);
			currentDay.should("have.class", "bg-background");
			currentDay.click();
			currentDay.should("have.class", "bg-primary");
			currentDay.click();
			currentDay.should("have.class", "bg-background");
		}
	});
	it("should be apply red color in border and text", () => {
		cy.mount(<FormMock />);
		cy.get("button[type='submit']").click();
		for (const dayName of weekDays) {
			cy.get(`button[id=${dayName}]`)
				.should("have.class", "text-red-500")
				.should("have.class", "border-red-500");
		}
	});
	it("should render label with same text in label propertie", () => {
		const label = "teste";
		cy.mount(<FormMock label={label} />);
		cy.get("label").should("exist").should("have.text", label);
	});
	it("should save value in string number in 1 to sunday and 7 saturday", () => {
		cy.mount(<FormMock />);
		for (const dayName of weekDays) {
			cy.get(`button[id=${dayName}]`).click();
		}
		cy.get("div[id='week-days-select']").should("have.attr", "aria-valuetext", "1,2,3,4,5,6,7");
		for (const dayName of weekDays) {
			cy.get(`button[id=${dayName}]`).click();
		}
		cy.get("button[id=domingo]").click();
		cy.get("div[id='week-days-select']").should("have.attr", "aria-valuetext", "1");
		cy.get("button[id=quarta]").click();
		cy.get("div[id='week-days-select']").should("have.attr", "aria-valuetext", "1,4");
	});
});
