import { Options } from "@/view/components/options/options";
import "@/view/styles/globals.css";
describe("<Options />", () => {
	const options = Array.from({ length: 3 }, (_, index) => ({
		label: `Option ${index + 1}`,
		onClick: () => {
			console.log(`Option ${index + 1} clicked`);
		},
	}));
	function Mock() {
		return <Options options={options} />;
	}
	function getOptionTrigger() {
		return cy.get("button[id='option-trigger']");
	}
	it("Should render option trigger button", () => {
		cy.mount(<Mock />);
		getOptionTrigger().should("exist");
	});
	it("Should render menuitem div", () => {
		cy.mount(<Mock />);
		getOptionTrigger().click();
		cy.get("div[role='menuitem']").should("exist");
	});
	it("Should render all option of options", () => {
		cy.mount(<Mock />);
		cy.window().then((win) => {
			cy.stub(win.console, "log").as("consoleLog");
		});
		for (const option of options) {
			getOptionTrigger().click();
			cy.contains("div", option.label).should("exist").click();
			cy.get("@consoleLog").should("have.been.calledWith", `${option.label} clicked`);
		}
	});
});
