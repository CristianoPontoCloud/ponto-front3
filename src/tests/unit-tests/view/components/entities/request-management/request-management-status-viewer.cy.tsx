import {
	RequestInstanceStatusEnum,
	getRequestInstanceStatus,
} from "@/domain/entities/request-instance/request-instance-status";
import {
	RequestInstanceStatusViewer,
	type RequestInstanceStatusViewerCustomParams,
	requestInstanceStatusViewerColor,
} from "@/view/components/entities/request-instance/request-instance-status-viewer";
import "@/view/styles/globals.css";
describe("<RequestInstanceBadgeStatus />", () => {
	function Mock({ status }: RequestInstanceStatusViewerCustomParams) {
		return <RequestInstanceStatusViewer status={status} />;
	}
	const { APPROVED, PENDING, REJECTED } = RequestInstanceStatusEnum;
	it(`Should render a label and colors according to the ${APPROVED} status`, () => {
		cy.mount(<Mock status={getRequestInstanceStatus(APPROVED)} />);
		cy.contains("div", getRequestInstanceStatus(APPROVED).label).should("exist");
		cy.get(`div.${requestInstanceStatusViewerColor[APPROVED]}`).should("exist");
	});
	it(`Should render a label and colors according to the ${PENDING} status`, () => {
		cy.mount(<Mock status={getRequestInstanceStatus(PENDING)} />);
		cy.contains("div", getRequestInstanceStatus(PENDING).label).should("exist");
		cy.get(`div.${requestInstanceStatusViewerColor[PENDING]}`).should("exist");
	});
	it(`Should render a label and colors according to the ${REJECTED} status`, () => {
		cy.mount(<Mock status={getRequestInstanceStatus(REJECTED)} />);
		cy.contains("div", getRequestInstanceStatus(REJECTED).label).should("exist");
		cy.get(`div.${requestInstanceStatusViewerColor[REJECTED]}`).should("exist");
	});
});
