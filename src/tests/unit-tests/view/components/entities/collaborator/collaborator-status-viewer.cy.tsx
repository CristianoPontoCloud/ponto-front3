import {
	CollaboratorStatusEnum,
	collaboratorStatusDefaultMap,
} from "@/domain/entities/collaborator/collaborator-status";
import {
	CollaboratorStatusViewer,
	collaboratorStatusColor,
} from "@/view/components/entities/collaborator/collaborator-status-viewer";
import "@/view/styles/globals.css";
describe("<CollaboratorInMultipleCompaniesWarning />", () => {
	const { active, dismissed, inactive } = CollaboratorStatusEnum;
	function Mock({ status = active }: { status: CollaboratorStatusEnum }) {
		const valueLabelStatus = collaboratorStatusDefaultMap[status];
		return <CollaboratorStatusViewer status={valueLabelStatus} />;
	}
	const activeStatus = collaboratorStatusDefaultMap[active];
	const activeBgColor = collaboratorStatusColor.ACTIVE;
	it(`Should render div with text ${activeStatus.label}, div with class ${activeBgColor} and rounded-full`, () => {
		cy.mount(<Mock status={active} />);
		cy.contains("div", activeStatus.label).should("exist");
		cy.get(`div.${activeBgColor}`).should("exist").should("have.class", "rounded-full");
	});
	const inactiveStatus = collaboratorStatusDefaultMap[inactive];
	const inactiveBgColor = collaboratorStatusColor.INACTIVE;
	it(`Should render div with text ${inactiveStatus.label}, div with class ${inactiveBgColor} and rounded-full`, () => {
		cy.mount(<Mock status={inactive} />);
		cy.contains("div", inactiveStatus.label).should("exist");
		cy.get(`div.${inactiveBgColor}`).should("exist").should("have.class", "rounded-full");
	});
	const dismissedStatus = collaboratorStatusDefaultMap[dismissed];
	const dismissedBgColor = collaboratorStatusColor.DISMISSED;
	it(`Should render div with text ${dismissedStatus.label}, div with class ${dismissedBgColor} and rounded-full`, () => {
		cy.mount(<Mock status={dismissed} />);
		cy.contains("div", dismissedStatus.label).should("exist");
		cy.get(`div.${dismissedBgColor}`).should("exist").should("have.class", "rounded-full");
	});
});
