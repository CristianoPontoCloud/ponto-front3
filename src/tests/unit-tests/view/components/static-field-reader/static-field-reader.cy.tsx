import { StaticFieldReader } from "@/view/components/static-field-reader/static-field-reader";
import "@/view/styles/globals.css";
import { faker } from "@faker-js/faker";
describe("<StaticFieldReader />", () => {
	const label = faker.commerce.department();
	const value = faker.commerce.department();
	function Mock() {
		return <StaticFieldReader label={label} value={value} />;
	}

	beforeEach(() => {
		cy.mount(<Mock />);
	});
	it(`Should be render span with text ${label}`, () => {
		cy.contains(label).should("exist");
	});
	it(`Should be render span with text ${value}`, () => {
		cy.contains(value).should("exist");
	});
});
