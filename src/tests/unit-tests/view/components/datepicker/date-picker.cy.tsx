import { DatePicker } from "@/view/components/datepicker/date-picker";
import "@/view/styles/globals.css";
import { useState } from "react";
import type { Matcher } from "react-day-picker";
describe("<DatePicker />", () => {
	function Mock({ invalidDates }: { invalidDates?: Matcher | Matcher[] }) {
		const [date, setDate] = useState<Date | null>(new Date());
		return (
			<DatePicker
				id="date-picker"
				onDateSelect={(d) => setDate(d)}
				value={date}
				invalidDates={invalidDates}
			/>
		);
	}

	function openCallendar() {
		cy.get("button[id='date-picker']").click();
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
	it("Should render sheet button", () => {
		cy.mount(<Mock />);
		cy.get("button[id='date-picker']").should("exist");
	});
	it("Should open calendar", () => {
		cy.mount(<Mock />);
		openCallendar();
		cy.get("div[role='dialog']").should("exist");
	});
	it("Should render one button for each day in current month.", () => {
		cy.mount(<Mock />);
		openCallendar();
		const date = new Date();
		const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
		Cypress._.times(lastDay, (item) => {
			cy.contains("button", item.toString()).should("exist");
		});
	});
	it("In the calendar should render current month and year.", () => {
		cy.mount(<Mock />);
		openCallendar();
		const date = new Date();
		const monthName = date.toLocaleString("pt-BR", { month: "long" });
		cy.contains("div", `${monthName} ${date.getFullYear()}`).should("exist");
	});
	it("In the calendar when click in day button should render in input full date in br format.", () => {
		cy.mount(<Mock />);
		openCallendar();
		const day = 15;
		selectDay(day);
		const date = new Date();
		date.setDate(day);
		verifyPlaceholder(date);
	});
	it("In the calendar when click in button with left arrow icon should change current month to previous month.", () => {
		cy.mount(<Mock />);
		openCallendar();
		changeMonthTo("previous");
		const date = new Date();
		date.setMonth(date.getMonth() - 1);
		const monthName = date.toLocaleString("pt-BR", { month: "long" });
		cy.contains("div", `${monthName} ${date.getFullYear()}`).should("exist");
	});
	it("In calendar when click button with left arrow 12 times change year.", () => {
		cy.mount(<Mock />);
		openCallendar();
		changeYearTo("previous");
		const date = new Date();
		date.setFullYear(date.getFullYear() - 1);
		verifyMonthAndYearIndicator(date);
	});
	it("In calendar when click button with right arrow 12 times change year.", () => {
		cy.mount(<Mock />);
		openCallendar();
		changeYearTo("next");
		const date = new Date();
		date.setFullYear(date.getFullYear() + 1);
		verifyMonthAndYearIndicator(date);
	});
	it("In the calendar, when selecting the date again after changing the month and year to previous, the placeholder and the month and year indication should be updated.", () => {
		cy.mount(<Mock />);
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
		cy.mount(<Mock />);
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
		cy.mount(<Mock invalidDates={(date) => date >= newdate} />);
		openCallendar();
		cy.contains("button", newdate.getDate() + 1).should("be.disabled");
	});
});
