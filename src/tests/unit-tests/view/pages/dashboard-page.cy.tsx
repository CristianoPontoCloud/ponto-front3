import { DashboardPage } from "@/view/pages/dashboard/dashboard-page";
import "@/view/styles/globals.css";
import { SessionProvider } from "next-auth/react";
describe("<DashboardPage />", () => {
	function PageMock() {
		return (
			<SessionProvider>
				<DashboardPage />
			</SessionProvider>
		);
	}
	it("Dashboard page must contain PunchClockViewer", () => {
		cy.mount(<PageMock />);
		cy.get("div[id=punch-clock-viewer]").should("exist");
	});
	it("Dashboard page must contain PunchList", () => {
		cy.mount(<PageMock />);
		cy.get("div[id=punch-list]").should("exist");
	});
	it("Dashboard page must contain PunchLine", () => {
		cy.mount(<PageMock />);
		cy.get("div[id=next-punch], div[id=punch-line]").should("exist");
	});
	it("Dashboard page must contain next-punch", () => {
		cy.mount(<PageMock />);
		cy.get("div[id=next-punch]").should("exist");
	});
});
