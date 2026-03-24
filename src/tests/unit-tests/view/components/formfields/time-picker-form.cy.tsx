import type { TimePickerFormParams } from "@/domain/components/formfields/time-picker-form";
import { TimePickerForm } from "@/view/components/formfields/time-picker-form";
import { Button } from "@/view/components/ui/button";
import { Form } from "@/view/components/ui/form";
import "@/view/styles/globals.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

describe("<TimePickerForm />", () => {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const FormMock = (params: Omit<TimePickerFormParams<any>, "form" | "formFieldName">) => {
		const schema = z.object({
			name: z.string().min(3),
		});
		const form = useForm({
			values: {
				name: "",
			},
			mode: "onSubmit",
			resolver: zodResolver(schema),
		});
		function onSubmit(data: {
			name: string;
		}) {
			console.log(data);
		}
		return (
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="m-2 flex gap-2">
					<TimePickerForm form={form} formFieldName="name" {...params} />
					<Button type="submit">submit</Button>
				</form>
			</Form>
		);
	};

	it("When click should be open dialog div", () => {
		cy.mount(<FormMock />);
		cy.get("button[id='time-picker-trigger']").click();
		cy.get("div[role='dialog']").should("exist");
	});
	it("In dialog should be exist label with Hr and Min", () => {
		cy.mount(<FormMock />);
		cy.get("button[id='time-picker-trigger']").click();
		cy.get("div[role='dialog']")
			.should("exist")
			.then(($el) => {
				const hrLabel = $el.find("label:contains('Hr')");
				const mnLabel = $el.find("label:contains('Min')");
				cy.wrap(hrLabel).should("exist");
				cy.wrap(mnLabel).should("exist");
			});
	});
	it("In hr container should be render all hour days ", () => {
		cy.mount(<FormMock />);
		cy.get("button[id='time-picker-trigger']").click();
		cy.get("div[id='hr-container']")
			.should("exist")
			.then(($el) => {
				Array.from({ length: 24 }).map((_, index) => {
					const hour = `${index <= 9 ? "0" : ""}${index}`;
					const button = $el.find(`button:contains('${hour}')`);
					cy.wrap(button).should("exist");
				});
			});
	});
	it("In hr container should be render all minutes in one hour ", () => {
		cy.mount(<FormMock />);
		cy.get("button[id='time-picker-trigger']").click();
		cy.get("div[id='min-container']")
			.should("exist")
			.then(($el) => {
				Array.from({ length: 60 }).map((_, index) => {
					const hour = `${index <= 9 ? "0" : ""}${index}`;
					const button = $el.find(`button:contains('${hour}')`);
					cy.wrap(button).should("exist");
				});
			});
	});

	it("When click in hr button change hr text in button trigger", () => {
		cy.mount(<FormMock />);
		cy.get("button[id='time-picker-trigger']").click();
		cy.get("div[id='min-container']").then(($el) => {
			const button = $el.find(`button:contains('00')`);
			cy.wrap(button).click();
		});
		cy.get("div[id='hr-container']")
			.should("exist")
			.then(($el) => {
				Array.from({ length: 24 }).map((_, index) => {
					const hour = `${index <= 9 ? "0" : ""}${index}`;
					const button = $el.find(`button:contains('${hour}')`);
					cy.wrap(button).click();
					cy.contains("button", `${hour}:00`);
				});
			});
	});
	it("When click in min button change min text in button trigger", () => {
		cy.mount(<FormMock />);
		cy.get("button[id='time-picker-trigger']").click();
		cy.get("div[id='hr-container']").then(($el) => {
			const button = $el.find(`button:contains('00')`);
			cy.wrap(button).click();
		});
		cy.get("div[id='min-container']")
			.should("exist")
			.then(($el) => {
				Array.from({ length: 60 }).map((_, index) => {
					const hour = `${index <= 9 ? "0" : ""}${index}`;
					const button = $el.find(`button:contains('${hour}')`);
					cy.wrap(button).click();
					cy.contains("button", `00:${hour}`);
				});
			});
	});
	it("Should render label", () => {
		cy.mount(<FormMock label="Nome" />);
		cy.get("label[for='name']").should("exist");
	});
	it("It should render red label and border on submit and not respect validation", () => {
		cy.mount(<FormMock label="name" />);
		cy.get("form").should("exist");
		cy.get("button[type='submit']").click();
		cy.get("button[id='time-picker-trigger']").should("have.class", "border-red-500");
		cy.get("label[for='name']").should("have.class", "text-red-500");
	});
});
