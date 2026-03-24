import {
	StatusViewerCustom,
	type StatusViewerCustomParams,
} from "@/view/components/status-viewer/status-viewer-custom";
import "@/view/styles/globals.css";
import { faker } from "@faker-js/faker";
enum StatusEnum {
	REJECTED = "REJECTED",
	ACCEPTED = "ACCEPTED",
}
describe("<StatusViewerCustom />", () => {
	const label = faker.commerce.department();
	const { REJECTED, ACCEPTED } = StatusEnum;
	const statusAccepted = { label, value: ACCEPTED };
	const statusRejected = { label, value: REJECTED };
	const statusColors = {
		[ACCEPTED]: "bg-lime-500",
		[REJECTED]: "bg-red-500",
	};
	function Mock({ status }: { status: StatusViewerCustomParams["status"] }) {
		return <StatusViewerCustom status={status} colorsByStatus={statusColors} />;
	}

	it(`Should be render red div when value is in status objetct ${ACCEPTED}`, () => {
		cy.mount(<Mock status={statusAccepted} />);
		cy.contains("span", label).should("exist");
		cy.get("div#status-color").should("exist").should("have.class", "bg-lime-500");
	});
	it(`Should be render red div when value is in status objetct ${REJECTED}`, () => {
		cy.mount(<Mock status={statusRejected} />);
		cy.contains("span", label).should("exist");
		cy.get("div#status-color").should("exist").should("have.class", "bg-red-500");
	});
});
