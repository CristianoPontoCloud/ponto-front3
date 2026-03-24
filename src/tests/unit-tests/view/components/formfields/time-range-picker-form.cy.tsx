import type { TimeRangePickerFormParams } from "@/domain/components/formfields/time-picker-range-form";
import { TimeRangePickerForm } from "@/view/components/formfields/time-range-picker-form";
import { Button } from "@/view/components/ui/button";
import { Form } from "@/view/components/ui/form";
import "@/view/styles/globals.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

describe("<TimeRangePickerForm />", () => {
	const endTimeKeyForm = "startTime";
	const startTimeKeyForm = "endTime";
	const FormMock = (
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		params: Omit<TimeRangePickerFormParams<any>, "form" | "endTimeKeyForm" | "startTimeKeyForm">,
	) => {
		const schema = z.object({
			[endTimeKeyForm]: z.string().min(3),
			[startTimeKeyForm]: z.string().min(3),
		});
		const form = useForm({
			values: {
				[endTimeKeyForm]: "",
				[startTimeKeyForm]: "",
			},
			mode: "onSubmit",
			resolver: zodResolver(schema),
		});
		function onSubmit(data: {
			[endTimeKeyForm]: string;
			[startTimeKeyForm]: string;
		}) {
			console.log(data);
		}
		return (
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="m-2 flex gap-2">
					<TimeRangePickerForm
						form={form}
						endTimeKeyForm="endTime"
						startTimeKeyForm="startTime"
						{...params}
					/>
					<Button type="submit">submit</Button>
				</form>
			</Form>
		);
	};

	function getTimePicker() {
		return cy.get("button[id='time-picker-range']").should("exist");
	}
	function openTimePicker() {
		getTimePicker().click();
	}
	function getDivDialog() {
		return cy.get("div[role='dialog']").should("exist");
	}
	function setHrTo00() {
		cy.get("div[id='hr-container']").then(($el) => {
			const button = $el.find(`button:contains('00')`);
			cy.wrap(button).click();
		});
	}
	function setMinTo00() {
		cy.get("div[id='min-container']").then(($el) => {
			const button = $el.find(`button:contains('00')`);
			cy.wrap(button).click();
		});
	}
	it("When click should be open dialog div", () => {
		cy.mount(<FormMock />);
		openTimePicker();
		getDivDialog();
	});
	it("In dialog should be exist label with Hr and Min", () => {
		cy.mount(<FormMock />);
		openTimePicker();
		getDivDialog().then(($el) => {
			const hrLabel = $el.find("label:contains('Hr')");
			const mnLabel = $el.find("label:contains('Min')");
			cy.wrap(hrLabel).should("exist");
			cy.wrap(mnLabel).should("exist");
		});
	});

	it("When setup start values change to setup end values", () => {
		cy.mount(<FormMock />);
		openTimePicker();
		cy.get("button[id='time-start']").should("have.class", "bg-primary");
		setHrTo00();
		setMinTo00();
		cy.get("button[id='time-end']").should("have.class", "bg-primary");
		setHrTo00();
		setMinTo00();
		getTimePicker().then(($el) => {
			const spanStart = $el.find("span#start:contains('00:00')");
			cy.wrap(spanStart).should("exist");
			const spanEnd = $el.find("span#end:contains('00:00')");
			cy.wrap(spanEnd).should("exist");
		});
	});

	it("When the start value is greater than the end value, synchronize both values at the same time.", () => {
		cy.mount(<FormMock />);
		openTimePicker();
		setHrTo00();
		setMinTo00();
		setHrTo00();
		setMinTo00();
		cy.get("button[id='time-start']").click();
		cy.get("button[id='time-start']").should("have.class", "bg-primary");
		cy.get("div[id='hr-container']").then(($el) => {
			const button = $el.find("button#h-01");
			cy.wrap(button).click();
		});
		getTimePicker().then(($el) => {
			const spanStart = $el.find("span#start:contains('01:00')");
			cy.wrap(spanStart).should("exist");
			const spanEnd = $el.find("span#end:contains('01:00')");
			cy.wrap(spanEnd).should("exist");
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
		cy.get("button[name='name']").should("have.class", "border-red-500");
		cy.get("label[for='name']").should("have.class", "text-red-500");
	});
});
