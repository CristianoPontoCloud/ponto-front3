import type { MonthPickerFormFieldParams } from "@/domain/components/formfields/mouth-form-field";
import MonthPickerForm from "@/view/components/formfields/month-picker-form-field";
import { monthPickerFullMonthNames } from "@/view/components/month-picker/use-month-picker";
import { Button } from "@/view/components/ui/button";
import { Form } from "@/view/components/ui/form";
import "@/view/styles/globals.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
describe("<MonthPickerForm />", () => {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const FormMock = (params: Omit<MonthPickerFormFieldParams<any>, "form" | "formFieldName">) => {
		const schema = z.object({
			date: z.string().min(2),
		});
		const form = useForm({
			values: {
				date: "",
			},
			mode: "onSubmit",
			resolver: zodResolver(schema),
		});
		function onSubmit(data: {
			date: string;
		}) {
			console.log(data);
		}
		return (
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="m-2 flex gap-2">
					<MonthPickerForm form={form} formFieldName="date" {...params} />
					<Button type="submit">submit</Button>
				</form>
			</Form>
		);
	};
	const abreviationMonths = Object.keys(monthPickerFullMonthNames);

	function openMounthHud() {
		cy.get("button[id='month-trigger']").click();
	}
	const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Set", "Out", "Nov", "Dez"];
	it("Should open a select month hud", () => {
		cy.mount(<FormMock />);
		openMounthHud();
		cy.get("div[role='dialog']").should("exist");
	});
	it("Should be render all months", () => {
		cy.mount(<FormMock />);
		openMounthHud();
		cy.get("div[role='dialog']").then(($el) => {
			for (const month of months) {
				const buttonMounth = $el.find(`button:contains(${month})`);
				cy.wrap(buttonMounth).should("exist");
			}
		});
	});
	it("Should be change month selected on click in one month in hud", () => {
		cy.mount(<FormMock />);
		openMounthHud();
		cy.get("div[role='dialog']").then(($el) => {
			const date = new Date();
			const currentMonth = date.getMonth();
			const currentYear = date.getFullYear();
			months.forEach((month, index) => {
				const currentFullNameMonth =
					monthPickerFullMonthNames[month as keyof typeof monthPickerFullMonthNames];
				const buttonMonth = $el.find(`button:contains(${month})`);
				const button = cy.wrap(buttonMonth);
				const isNextsMonths = currentMonth < index;
				if (isNextsMonths) {
					button.should("be.disabled");
					return;
				}
				cy.wrap(buttonMonth).click();
				cy.get(`button:contains(${currentFullNameMonth}/${currentYear})`).should("exist");
			});
		});
	});
	it("Should be change year on click in arrows ", () => {
		cy.mount(<FormMock />);
		openMounthHud();
		cy.get("div[role='dialog']").then(() => {
			const date = new Date();
			const currentMonth = abreviationMonths[
				date.getMonth()
			] as keyof typeof monthPickerFullMonthNames;
			const currentYear = date.getFullYear();
			cy.get("button[id=next-year]").should("be.disabled");
			const previousYearButton = cy.get("button[id=previous-year]").should("exist");
			previousYearButton.click();
			cy.get(
				`button:contains(${monthPickerFullMonthNames[currentMonth]}/${currentYear - 1})`,
			).should("exist");
			cy.get("button[id=next-year]").should("not.be.disabled").click();
			cy.get(`button:contains(${monthPickerFullMonthNames[currentMonth]}/${currentYear})`).should(
				"exist",
			);
		});
	});
	it("Should render label", () => {
		cy.mount(<FormMock label="Mes" />);
		cy.get("label[for='date']").should("exist");
	});
	it("It should render red label and border on submit and not respect validation", () => {
		cy.mount(<FormMock label="name" />);
		cy.get("form").should("exist");
		cy.get("button[type='submit']").click();
		cy.get("button[type='button']").should("have.class", "border-red-500");
		cy.get("label[for='date']").should("have.class", "text-red-500");
	});
});
