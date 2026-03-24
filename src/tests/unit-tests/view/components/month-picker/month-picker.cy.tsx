import { MonthPicker } from "@/view/components/month-picker/month-picker";
import {
	monthPickerFullMonthNames,
	monthPickerInitialValueMonth,
	monthPickerInitialValueYear,
} from "@/view/components/month-picker/use-month-picker";
import "@/view/styles/globals.css";
import { useState } from "react";
describe("<MonthPicker />", () => {
	const monthInitial = monthPickerInitialValueMonth("");
	const yearInitial = monthPickerInitialValueYear("");
	const monthView = `${monthPickerFullMonthNames?.[monthInitial.label as keyof typeof monthPickerFullMonthNames] ?? ""}/${yearInitial}`;
	function Mock({
		hasError = false,
		initialValue = "",
	}: { hasError?: boolean; initialValue?: string }) {
		const [month, setMonth] = useState<string>(initialValue);
		return (
			<MonthPicker onChangeMonth={(value) => setMonth(value)} value={month} hasError={hasError} />
		);
	}
	const buttonId = "month-trigger";
	function getButtonMonthTrigger() {
		return cy.get(`button[id='${buttonId}']`);
	}
	function getCalendar() {
		return cy.get("div[role='dialog']");
	}
	const abreviationMonths = Object.keys(monthPickerFullMonthNames);

	it(`Should render button with ${buttonId} id`, () => {
		cy.mount(<Mock />);
		getButtonMonthTrigger().should("exist");
	});
	it("Should calendar svg", () => {
		cy.mount(<Mock />);
		cy.get("svg.lucide-calendar").should("exist");
	});
	it(`Should render ${monthView} text`, () => {
		cy.mount(<Mock />);
		cy.contains("button", monthView).should("exist");
	});
	it(`Should render calendar when click in ${buttonId} button`, () => {
		cy.mount(<Mock />);
		getButtonMonthTrigger().click();
		getCalendar().should("exist");
	});

	it("Should open a select month hud", () => {
		cy.mount(<Mock />);
		getButtonMonthTrigger().click();
		cy.get("div[role='dialog']").should("exist");
	});
	it("Should render all months", () => {
		cy.mount(<Mock />);
		getButtonMonthTrigger().click();

		for (const month of abreviationMonths) {
			cy.get("div[role='dialog']").contains("button", month).should("exist");
		}
	});
	it("Should be change month selected on click in one month in hud", () => {
		cy.mount(<Mock />);
		getButtonMonthTrigger().click();
		cy.get("div[role='dialog']").then(($el) => {
			const date = new Date();
			const currentMonth = date.getMonth();
			const currentYear = date.getFullYear();

			abreviationMonths.forEach((month, index) => {
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
		cy.mount(<Mock />);
		getButtonMonthTrigger().click();
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
});
