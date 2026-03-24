import { ModalProvider } from "@/application/providers/modal-provider/modal-provider";
import { PunchClockModalForm } from "@/view/components/forms/punch-clock/punch-clock-modal-form";
import "@/view/styles/globals.css";
import { SessionProvider } from "next-auth/react";
describe("<PunchClockModalForm />", () => {
	function Mock() {
		return (
			<SessionProvider>
				<ModalProvider>
					<PunchClockModalForm />
				</ModalProvider>
			</SessionProvider>
		);
	}

	it("Form must contain render PunchClockHeaderModalForm with id before-submit", () => {
		cy.mount(<Mock />);
		cy.get("div[id=before-submit]").should("exist");
	});
	it("Form must contain render TimeViewer", () => {
		cy.mount(<Mock />);
		cy.get("div[id=time-viewer]").should("exist");
	});
	it("Form must contain render Tabs", () => {
		cy.mount(<Mock />);
		cy.get("div[id=tabs-type]").should("exist");
	});
	it("Change content of type-container", () => {
		cy.mount(<Mock />);
		cy.get("div[id=type-container]").should("exist");
		cy.get("button[id=pin-option").should("exist").click();
	});
});
