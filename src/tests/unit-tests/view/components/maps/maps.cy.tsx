import { Maps } from "@/view/components/maps/maps";
import "@/view/styles/globals.css";
describe("<Maps />", () => {
	function Mock() {
		return (
			<Maps>
				<div />
			</Maps>
		);
	}
	it("Should render maps", () => {
		cy.mount(<Mock />);
		cy.get("div[data-testid='map']").should("exist");
	});
});
