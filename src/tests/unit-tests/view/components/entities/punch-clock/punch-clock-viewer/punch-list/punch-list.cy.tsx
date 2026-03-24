import { PunchList } from "@/view/components/entities/punch-clock/punch-clock-viewer/punch-list/punch-list";
import "@/view/styles/globals.css";
describe("<PunchList />", () => {
	it("PunchList component must render punch-line, or next-punch, or both ", () => {
		cy.mount(<PunchList />);
		cy.get("div[id=punch-line], div[id=next-punch]").should("exist");
	});
});
