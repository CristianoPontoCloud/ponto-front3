import { TimePicker, type TimePickerParams } from "@/view/components/time-picker/time-picker";
import "@/view/styles/globals.css";
import { faker } from "@faker-js/faker";
import { useState } from "react";

describe("<TimePicker />", () => {
	function Mock({
		hasError,
		classNames,
		disabled,
		maxTime,
		minTime,
	}: Omit<TimePickerParams, "value" | "setValue">) {
		const [value, setValue] = useState<string>("");
		return (
			<TimePicker
				value={value}
				setValue={setValue}
				hasError={hasError}
				maxTime={maxTime}
				minTime={minTime}
				classNames={classNames}
				disabled={disabled}
			/>
		);
	}
	const triggerId = "button[id='time-picker-trigger']";
	const defaultTimeId = "div[id='default-time']";
	const popoverId = "div[id='popover-content']";

	function baseTest(hasError: boolean) {
		it("should render time picker button", () => {
			cy.mount(<Mock hasError={hasError} />);
			cy.get(triggerId).should("exist");
		});
		it("should render trigger button without disabled", () => {
			cy.mount(<Mock hasError={hasError} />);
			cy.get(triggerId).should("exist").should("not.be.disabled");
			cy.get(triggerId).click();
		});
		it("should render trigger button with disabled", () => {
			cy.mount(<Mock hasError={hasError} disabled />);
			cy.get(triggerId).should("exist").should("be.disabled");
		});
		it("should render trigger button default time div", () => {
			cy.mount(<Mock hasError={hasError} disabled />);
			cy.get("div[id='default-time']").should("exist").should("have.text", "00:00");
		});
	}
	describe("Tests with hasError is false", () => {
		baseTest(false);
		it("should render trigger button with with class border-input", () => {
			cy.mount(<Mock hasError={false} disabled />);
			cy.get(triggerId).should("exist").should("have.class", "border-input");
		});
	});
	describe("Tests with hasError is true", () => {
		baseTest(true);
		it("should render trigger button with with class border-red-500", () => {
			cy.mount(<Mock hasError={true} disabled />);
			cy.get(triggerId).should("exist").should("have.class", "border-red-500");
		});
	});
	function baseTestInPopover() {
		it("Should close popover on click out of trigger button", () => {
			cy.get(triggerId).should("exist").click();
			cy.get(popoverId).should("not.exist");
		});
		it("Should change time in trigger button", () => {
			cy.get(defaultTimeId).should("exist");
			const hour = `${faker.number.int({ min: 0, max: 23 })}`.padStart(2, "0");
			const minutes = `${faker.number.int({ min: 0, max: 59 })}`.padStart(2, "0");
			const hourButtonId = `button[id='hr-${hour}']`;
			const minutesButtonId = `button[id='min-${minutes}']`;
			const time = `${hour}:${minutes}`;
			cy.get(hourButtonId).should("exist").click();
			cy.get(minutesButtonId).should("exist").click();
			cy.get(triggerId).should("exist").should("have.text", time);
			cy.get(defaultTimeId).should("not.exist");
		});
	}
	function testAllHours() {
		it("Should render all possibible values of hours", () => {
			cy.get("button[id='min-00']").should("exist").click();
			const hourArray: string[] = Array.from({ length: 24 }, (_, i) => {
				return String(i).padStart(2, "0");
			});
			for (const h of hourArray) {
				cy.get(`button[id='hr-${h}']`).should("exist").click();
				cy.get(triggerId).should("exist").should("have.text", `${h}:00`);
			}
		});
	}
	function testAllMinutes() {
		it("Should render all possibible values of minutes", () => {
			cy.get("button[id='hr-00']").should("exist").click();
			const minuteArray: string[] = Array.from({ length: 60 }, (_, i) =>
				String(i).padStart(2, "0"),
			);
			for (const m of minuteArray) {
				cy.get(`button[id='min-${m}']`).should("exist").click();
				cy.get(triggerId).should("exist").should("have.text", `00:${m}`);
			}
		});
	}
	describe("Tests with open popover without max or min time", () => {
		beforeEach(() => {
			cy.mount(<Mock hasError={false} />);
			cy.get(triggerId).should("exist").should("not.be.disabled").click();
			cy.get(popoverId).should("exist");
		});
		baseTestInPopover();
		testAllHours();
		testAllMinutes();
	});
	describe("Tests with open popover with max time defined", () => {
		beforeEach(() => {
			cy.mount(<Mock hasError={false} maxTime="01:01" minTime="01:01" />);
			cy.get(triggerId).should("exist").should("not.be.disabled").click();
			cy.get(popoverId).should("exist");
		});
		it("Should render disbled values greater than max time", () => {
			const hourArray: string[] = Array.from({ length: 24 }, (_, i) => {
				return String(i).padStart(2, "0");
			});
			const minuteArray: string[] = Array.from({ length: 60 }, (_, i) =>
				String(i).padStart(2, "0"),
			);
			for (const h of hourArray) {
				if (h !== "01") {
					cy.get(`button[id='hr-${h}']`).should("exist").should("be.disabled");
					continue;
				}
				cy.get(`button[id='hr-${h}']`).should("exist").click();
			}
			for (const m of minuteArray) {
				if (m !== "01") {
					cy.get(`button[id='min-${m}']`).should("exist").should("be.disabled");
					continue;
				}
				cy.get(`button[id='min-${m}']`).should("exist").click();
			}
			cy.get(triggerId).should("exist").should("have.text", "01:01");
		});
	});
});
