import {
	RequestInstanceStatusEnum,
	requestInstanceStatusMap,
} from "@/domain/entities/request-instance/request-instance-status";
import {
	RequestInstanceBadgeStatus,
	requestInstanceStatusBadgeColor,
} from "@/view/components/entities/request-instance/request-instance-badge-status";
import "@/view/styles/globals.css";
describe("<RequestInstanceBadgeStatus />", () => {
	function Mock({ statusValue }: { statusValue: RequestInstanceStatusEnum }) {
		return <RequestInstanceBadgeStatus statusValue={statusValue} />;
	}
	const { APPROVED, PENDING, REJECTED } = RequestInstanceStatusEnum;
	it(`Should render a label and colors according to the ${APPROVED} status`, () => {
		cy.mount(<Mock statusValue={APPROVED} />);
		cy.contains("div", requestInstanceStatusMap[APPROVED].label)
			.should("exist")
			.should("have.class", requestInstanceStatusBadgeColor[APPROVED]);
	});
	it(`Should render a label and colors according to the ${PENDING} status`, () => {
		cy.mount(<Mock statusValue={PENDING} />);
		cy.contains("div", requestInstanceStatusMap[PENDING].label)
			.should("exist")
			.should("have.class", requestInstanceStatusBadgeColor[PENDING]);
	});
	it(`Should render a label and colors according to the ${REJECTED} status`, () => {
		cy.mount(<Mock statusValue={REJECTED} />);
		cy.contains("div", requestInstanceStatusMap[REJECTED].label)
			.should("exist")
			.should("have.class", requestInstanceStatusBadgeColor[REJECTED]);
	});
});
