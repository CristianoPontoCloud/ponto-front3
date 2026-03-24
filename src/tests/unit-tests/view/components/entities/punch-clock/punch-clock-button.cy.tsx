import { ModalProvider } from "@/application/providers/modal-provider/modal-provider";
import { PunchClockButton } from "@/view/components/entities/punch-clock/puch-clock-button";
import "@/view/styles/globals.css";
import { SessionProvider } from "next-auth/react";
describe("<PunchClockButton />", () => {
	function Mock() {
		return (
			<SessionProvider>
				<ModalProvider>
					<PunchClockButton />
				</ModalProvider>
			</SessionProvider>
		);
	}
	it("When click in PunchClockButton component must render form punch-clock", () => {
		cy.mount(<Mock />);
		const button = cy.get("button[id=punch-clock]").should("exist");
		button.should("exist").find("svg[id=scan-face]").should("exist");
		button.parents("button").click();
		cy.get("form[id=punch-clock]").should("exist");
	});
});
