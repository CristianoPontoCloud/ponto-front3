import type { TimePickerWithSecondsFormParams } from "@/domain/components/formfields/time-picker-with-seconds-form";
import { TimePickerWithSecondsForm } from "@/view/components/formfields/time-picker-with-seconds-form";
import { Button } from "@/view/components/ui/button";
import { Form } from "@/view/components/ui/form";
import "@/view/styles/globals.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

describe("<TimePickerWithSecondsForm />", () => {
	const formFieldName = "name";
	const FormMock = (
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		params: Omit<TimePickerWithSecondsFormParams<any>, "form" | "formFieldName">,
	) => {
		const schema = z.object({
			[formFieldName]: z.string().min(3),
		});
		const form = useForm({
			values: {
				[formFieldName]: "",
			},
			mode: "onSubmit",
			resolver: zodResolver(schema),
		});
		function onSubmit(data: {
			[formFieldName]: string;
		}) {
			console.log(data);
		}
		return (
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="m-2 flex gap-2">
					<TimePickerWithSecondsForm form={form} formFieldName={formFieldName} {...params} />
					<Button type="submit">submit</Button>
				</form>
			</Form>
		);
	};
	function getTimePicker() {
		return cy.get("button[id='time-picker-with-seconds-trigger']").should("exist");
	}
	function openTimePicker() {
		getTimePicker().click();
	}
	it("When click should be open dialog div", () => {
		cy.mount(<FormMock />);
		openTimePicker();
		cy.get("div[role='dialog']").should("exist");
	});
	it("In dialog should be exist label with Hr, Min and Seg", () => {
		cy.mount(<FormMock />);
		openTimePicker();
		cy.get("div[role='dialog']")
			.should("exist")
			.then(($el) => {
				const hrLabel = $el.find("label:contains('Hr')");
				const mnLabel = $el.find("label:contains('Min')");
				const segLabel = $el.find("label:contains('Seg')");
				cy.wrap(hrLabel).should("exist");
				cy.wrap(mnLabel).should("exist");
				cy.wrap(segLabel).should("exist");
			});
	});
	it("In hr container should be render all hour days ", () => {
		cy.mount(<FormMock />);
		openTimePicker();
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
		openTimePicker();
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
	it("In hr container should be render all seconds in one minute ", () => {
		cy.mount(<FormMock />);
		openTimePicker();
		cy.get("div[id='seg-container']")
			.should("exist")
			.then(($el) => {
				Array.from({ length: 60 }).map((_, index) => {
					const hour = `${index <= 9 ? "0" : ""}${index}`;
					const button = $el.find(`button:contains('${hour}')`);
					cy.wrap(button).should("exist");
				});
			});
	});

	function setMinTo00() {
		cy.get("div[id='min-container']").then(($el) => {
			const button = $el.find(`button:contains('00')`);
			cy.wrap(button).click();
		});
	}
	function setSegTo00() {
		cy.get("div[id='seg-container']").then(($el) => {
			const button = $el.find(`button:contains('00')`);
			cy.wrap(button).click();
		});
	}
	function setHrTo00() {
		cy.get("div[id='hr-container']").then(($el) => {
			const button = $el.find(`button:contains('00')`);
			cy.wrap(button).click();
		});
	}
	it("When click in hr button change hr text in button trigger", () => {
		cy.mount(<FormMock />);
		openTimePicker();
		setMinTo00();
		setSegTo00();
		cy.get("div[id='hr-container']")
			.should("exist")
			.then(($el) => {
				Array.from({ length: 24 }).map((_, index) => {
					const hour = `${index <= 9 ? "0" : ""}${index}`;
					const button = $el.find(`button:contains('${hour}')`);
					cy.wrap(button).click();
					cy.contains("button", `${hour}:00:00`).should("exist");
				});
			});
	});
	it("When click in min button change min text in button trigger", () => {
		cy.mount(<FormMock />);
		openTimePicker();
		setHrTo00();
		setSegTo00();
		cy.get("div[id='min-container']")
			.should("exist")
			.then(($el) => {
				Array.from({ length: 60 }).map((_, index) => {
					const hour = `${index <= 9 ? "0" : ""}${index}`;
					const button = $el.find(`button:contains('${hour}')`);
					cy.wrap(button).click();
					cy.contains("button", `00:${hour}:00`).should("exist");
				});
			});
	});
	it("When click in min button change seg text in button trigger", () => {
		cy.mount(<FormMock />);
		openTimePicker();
		setHrTo00();
		setMinTo00();
		cy.get("div[id='seg-container']")
			.should("exist")
			.then(($el) => {
				Array.from({ length: 60 }).map((_, index) => {
					const hour = `${index <= 9 ? "0" : ""}${index}`;
					const button = $el.find(`button:contains('${hour}')`);
					cy.wrap(button).click();
					cy.contains("button", `00:00:${hour}`).should("exist");
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
		getTimePicker().should("have.class", "border-red-500");
		cy.get("label[for='name']").should("have.class", "text-red-500");
	});
});
