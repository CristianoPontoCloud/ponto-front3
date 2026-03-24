import type { ValueLabel } from "@/domain/value-label";
import { SelectTabs } from "@/view/components/select-tabs/select-tabs";
import "@/view/styles/globals.css";
import { faker } from "@faker-js/faker";
import { useState } from "react";
import { v4 } from "uuid";
describe("<SelectTabs />", () => {
	const options: ValueLabel[] = Array.from({ length: 10 }, () => ({
		label: faker.person.firstName(),
		value: v4(),
	}));
	function Mock() {
		const [value, setValue] = useState(options[0].value);
		return (
			<SelectTabs options={options} value={value} onValueChange={(value) => setValue(value)} />
		);
	}
	it("Should be render select input", () => {
		cy.mount(<Mock />);
		cy.get("div[role='tablist']").should("exist");
	});
	it("Should be render each option show current label", () => {
		cy.mount(<Mock />);
		for (const option of options) {
			cy.get("button[role='tab']").contains(option.label).should("exist");
		}
	});
	it("Should be change value selected when click in option", () => {
		cy.mount(<Mock />);
		cy.get("button[role='tab']")
			.contains(options[0].label)
			.should("have.attr", "aria-selected", "true");
		for (const option of options) {
			cy.get("button[role='tab']")
				.contains(option.label)
				.click()
				.should("have.attr", "aria-selected", "true");
		}
	});
});
