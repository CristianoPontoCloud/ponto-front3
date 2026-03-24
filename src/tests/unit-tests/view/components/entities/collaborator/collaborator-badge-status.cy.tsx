import { CollaboratorStatusEnum } from "@/domain/entities/collaborator/collaborator-status";
import {
	CollaboratorBadgeStatus,
	collaboratorStatusColor,
	collaboratorStatusMap,
} from "@/view/components/entities/collaborator/collaborator-badge-status";
import "@/view/styles/globals.css";
describe("<CollaboratorBadgeStatus />", () => {
	const { active, dismissed, inactive } = CollaboratorStatusEnum;
	function Mock({ statusValue = active }: { statusValue?: CollaboratorStatusEnum }) {
		return <CollaboratorBadgeStatus statusValue={statusValue} />;
	}
	it(`Should render div with text ${collaboratorStatusMap[active].label} and class ${collaboratorStatusColor[active]}`, () => {
		cy.mount(<Mock />);
		cy.contains("div", collaboratorStatusMap[active].label)
			.should("exist")
			.should("have.class", collaboratorStatusColor[active]);
	});
	it(`Should render div with text ${collaboratorStatusMap[dismissed].label} and class ${collaboratorStatusColor[dismissed]}`, () => {
		cy.mount(<Mock statusValue={dismissed} />);
		cy.contains("div", collaboratorStatusMap[dismissed].label)
			.should("exist")
			.should("have.class", collaboratorStatusColor[dismissed]);
	});
	it(`Should render div with text ${collaboratorStatusMap[inactive].label} and class ${collaboratorStatusColor[inactive]}`, () => {
		cy.mount(<Mock statusValue={inactive} />);
		cy.contains("div", collaboratorStatusMap[inactive].label)
			.should("exist")
			.should("have.class", collaboratorStatusColor[inactive]);
	});
});
