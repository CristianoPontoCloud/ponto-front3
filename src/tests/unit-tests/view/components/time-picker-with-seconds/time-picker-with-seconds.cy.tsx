import {
	TimePickerWithSeconds,
	type TimePickerWithSecondsParams,
} from "@/view/components/time-picker-with-seconds/time-picker-with-seconds";
import "@/view/styles/globals.css";
import { faker } from "@faker-js/faker";
import { useState } from "react";

describe("<TimePickerWithSeconds />", () => {
	function Mock({ hasError, classNames }: Omit<TimePickerWithSecondsParams, "value" | "setValue">) {
		const [value, setValue] = useState<string>("");
		return (
			<TimePickerWithSeconds
				value={value}
				setValue={setValue}
				hasError={hasError}
				classNames={classNames}
			/>
		);
	}
	const triggerId = "button[id='time-picker-with-seconds-trigger']";
	// const triggerId = "div[id='default-time']";
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

		it("should render trigger button default time div", () => {
			cy.mount(<Mock hasError={hasError} />);
			cy.get(triggerId).should("exist").should("have.text", "00:00:00");
		});
	}
	describe("Tests with hasError is false", () => {
		baseTest(false);
		it("should render trigger button with with class border-input", () => {
			cy.mount(<Mock hasError={false} />);
			cy.get(triggerId).should("exist").should("have.class", "border-input");
		});
	});
	describe("Tests with hasError is true", () => {
		baseTest(true);
		it("should render trigger button with with class border-red-500", () => {
			cy.mount(<Mock hasError={true} />);
			cy.get(triggerId).should("exist").should("have.class", "border-red-500");
		});
	});
	function baseTestInPopover() {
		it("Should close popover on click out of trigger button", () => {
			cy.get(triggerId).should("exist").click();
			cy.get(popoverId).should("not.exist");
		});
		it("Should change time in trigger button", () => {
			cy.get(triggerId).should("exist");
			const hour = `${faker.number.int({ min: 0, max: 23 })}`.padStart(2, "0");
			const minutes = `${faker.number.int({ min: 0, max: 59 })}`.padStart(2, "0");
			const seconds = `${faker.number.int({ min: 0, max: 59 })}`.padStart(2, "0");
			const hourButtonId = `button[id='hr-${hour}']`;
			const minutesButtonId = `button[id='min-${minutes}']`;
			const secondsButtonId = `button[id='seg-${seconds}']`;
			const time = `${hour}:${minutes}:${seconds}`;
			cy.get(hourButtonId).should("exist").click();
			cy.get(minutesButtonId).should("exist").click();
			cy.get(secondsButtonId).should("exist").click();
			cy.get(triggerId).should("exist").should("have.text", time);
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
				cy.get(triggerId).should("exist").should("have.text", `${h}:00:00`);
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
				cy.get(triggerId).should("exist").should("have.text", `00:${m}:00`);
			}
		});
	}
	function testAllSeconds() {
		it("Should render all possibible values of seconds", () => {
			cy.get("button[id='seg-00']").should("exist").click();
			const secondsArray: string[] = Array.from({ length: 60 }, (_, i) =>
				String(i).padStart(2, "0"),
			);
			for (const m of secondsArray) {
				cy.get(`button[id='seg-${m}']`).should("exist").click();
				cy.get(triggerId).should("exist").should("have.text", `00:00:${m}`);
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
		testAllSeconds();
	});
});
