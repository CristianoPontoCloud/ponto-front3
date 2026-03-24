import type { DateFormFieldParams } from "@/domain/components/formfields/date-form-field";
import DateForm from "@/view/components/formfields/date-form-field";
import { Button } from "@/view/components/ui/button";
import { Form } from "@/view/components/ui/form";
import "@/view/styles/globals.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

describe("<DateForm />", () => {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const FormMock = (params: Omit<DateFormFieldParams<any>, "form" | "formFieldName">) => {
		const schema = z.object({
			date: z.date(),
		});
		const form = useForm({
			values: {
				date: null,
			},
			mode: "onSubmit",
			resolver: zodResolver(schema),
		});
		function onSubmit(data: {
			date: Date | null;
		}) {
			console.log(data);
		}
		return (
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="m-2 flex gap-2">
					<DateForm form={form} formFieldName="date" placeholder="date" {...params} />
					<Button type="submit">submit</Button>
				</form>
			</Form>
		);
	};

	function openCallendar() {
		cy.get("button[id='date']").should("be.visible").click();
	}
	function selectDay(day: number) {
		cy.contains("button", day.toString()).should("be.visible").click();
	}
	function changeMonthTo(type: "previous" | "next") {
		cy.get(`button[name='${type}-month']`).click();
	}
	function changeYearTo(type: "previous" | "next") {
		Cypress._.times(12, () => {
			return changeMonthTo(type);
		});
	}
	function verifyPlaceholder(date: Date) {
		cy.contains("button", date.toLocaleDateString("pt-BR")).should("exist");
	}
	function verifyMonthAndYearIndicator(date: Date) {
		cy.contains(
			"div",
			`${date.toLocaleString("pt-BR", { month: "long" })} ${date.getFullYear()}`,
		).should("exist");
	}
	it("When click in input open calendar.", () => {
		cy.mount(<FormMock />);
		openCallendar();
		cy.get("div[role=dialog]").should("exist");
		const date = new Date();
		const monthName = date.toLocaleString("pt-BR", { month: "long" });
		cy.contains("div", `${monthName} ${date.getFullYear()}`).should("exist");
		const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
		Cypress._.times(lastDay, (item) => {
			cy.contains("button", item.toString()).should("exist");
		});
	});
	it("Should render one button for each day in current month.", () => {
		cy.mount(<FormMock />);
		openCallendar();
		const date = new Date();
		const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
		Cypress._.times(lastDay, (item) => {
			cy.contains("button", item.toString()).should("exist");
		});
	});
	it("In the calendar should render current month and year.", () => {
		cy.mount(<FormMock />);
		openCallendar();
		const date = new Date();
		const monthName = date.toLocaleString("pt-BR", { month: "long" });
		cy.contains("div", `${monthName} ${date.getFullYear()}`).should("exist");
	});

	it("In the calendar when click in day button should render in input full date in br format.", () => {
		cy.mount(<FormMock />);
		openCallendar();
		const day = 15;
		selectDay(day);
		const date = new Date();
		date.setDate(day);
		verifyPlaceholder(date);
	});
	it("In the calendar when click in button with left arrow icon should change current month to previous month.", () => {
		cy.mount(<FormMock />);
		openCallendar();
		changeMonthTo("previous");
		const date = new Date();
		date.setMonth(date.getMonth() - 1);
		const monthName = date.toLocaleString("pt-BR", { month: "long" });
		cy.contains("div", `${monthName} ${date.getFullYear()}`).should("exist");
	});
	it("In the calendar when click in button with left arrow icon should change current month to next month.", () => {
		cy.mount(<FormMock />);
		openCallendar();
		changeMonthTo("next");
		const date = new Date();
		date.setMonth(date.getMonth() + 1);
		const monthName = date.toLocaleString("pt-BR", { month: "long" });
		cy.contains("div", `${monthName} ${date.getFullYear()}`).should("exist");
	});
	it("In calendar when click button with left arrow 12 times change year.", () => {
		cy.mount(<FormMock />);
		openCallendar();
		changeYearTo("previous");
		const date = new Date();
		date.setFullYear(date.getFullYear() - 1);
		verifyMonthAndYearIndicator(date);
	});
	it("In calendar when click button with right arrow 12 times change year.", () => {
		cy.mount(<FormMock />);
		openCallendar();
		changeYearTo("next");
		const date = new Date();
		date.setFullYear(date.getFullYear() + 1);
		verifyMonthAndYearIndicator(date);
	});
	it("In the calendar, when selecting the date again after changing the month and year to previous, the placeholder and the month and year indication should be updated.", () => {
		cy.mount(<FormMock />);
		openCallendar();
		const firstDay = 15;
		selectDay(firstDay);
		const date = new Date();
		date.setDate(firstDay);
		verifyPlaceholder(date);
		verifyMonthAndYearIndicator(date);
		changeYearTo("previous");
		changeMonthTo("previous");
		const secondDay = 14;
		selectDay(secondDay);
		date.setDate(secondDay);
		date.setMonth(date.getMonth() - 1);
		date.setFullYear(date.getFullYear() - 1);
		verifyPlaceholder(date);
		verifyMonthAndYearIndicator(date);
	});
	it("In the calendar, when selecting the date again after changing the month and year to next, the placeholder and the month and year indication should be updated.", () => {
		cy.mount(<FormMock />);
		openCallendar();
		const firstDay = 15;
		selectDay(firstDay);
		const date = new Date();
		date.setDate(firstDay);
		verifyPlaceholder(date);
		verifyMonthAndYearIndicator(date);
		changeYearTo("next");
		changeMonthTo("next");
		const secondDay = 14;
		selectDay(secondDay);
		date.setDate(secondDay);
		date.setMonth(date.getMonth() + 1);
		date.setFullYear(date.getFullYear() + 1);
		verifyPlaceholder(date);
		verifyMonthAndYearIndicator(date);
	});
	it("Shoul disabled day buttons after today.", () => {
		const newdate = new Date();
		cy.mount(<FormMock invalidDates={(date) => date >= newdate} />);
		openCallendar();
		cy.contains("button", newdate.getDate() + 1).should("be.disabled");
	});
	it("Should render label", () => {
		cy.mount(<FormMock label="date" />);
		cy.get("label[for='date']").should("exist");
	});
	it("It should render red label and border on submit and not respect validation", () => {
		cy.mount(<FormMock label="date" />);
		cy.get("form").should("exist");
		cy.get("button[type='submit']").click();
		cy.get("button[id='date']").should("have.class", "border-red-500");
		cy.get("label[for='date']").should("have.class", "text-red-500");
	});
});
