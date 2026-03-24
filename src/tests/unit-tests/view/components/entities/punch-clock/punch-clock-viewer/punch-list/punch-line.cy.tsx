import { PunchLine } from "@/view/components/entities/punch-clock/punch-clock-viewer/punch-list/punch-line";
import "@/view/styles/globals.css";
describe("<PunchLine />", () => {
	it("PunchLine component must render abreviation timePunching", () => {
		cy.mount(<PunchLine keyPunch="entry1" timePuching="00:00:00" />);
		cy.get("span[id=time-punching]").should("exist").should("have.text", "00:00:00");
		cy.get("svg[id=check]").should("exist");
		cy.get("div[id=empty-circle]").should("not.exist");
	});
	it("The PunchLine component must render the abbreviation as 'E{number}'.", () => {
		cy.mount(<PunchLine keyPunch="entry1" timePuching="00:00:00" />);
		cy.get("div[id=abreviation]").should("exist").should("have.text", "E1");
		cy.get("svg[id=check]").should("exist");
		cy.get("div[id=empty-circle]").should("not.exist");
	});
	it("The PunchLine component must render the abbreviation as 'S{number}'.", () => {
		cy.mount(<PunchLine keyPunch="out1" timePuching="00:00:00" />);
		cy.get("div[id=abreviation]").should("exist").should("have.text", "S1");
		cy.get("svg[id=check]").should("exist");
		cy.get("div[id=empty-circle]").should("not.exist");
	});
	it("The PunchLine component must render the next-punch.", () => {
		cy.mount(<PunchLine keyPunch="out1" />);
		cy.get("svg[id=check]").should("not.exist");
		cy.get("div[id=empty-circle]").should("exist");
	});
});
