import { CollaboratorViewer } from "@/view/components/entities/collaborator/collaborator-viewer";
import "@/view/styles/globals.css";
import { faker } from "@faker-js/faker";
import "cypress-real-events";
describe("<CollaboratorViewerTooltipContent />", () => {
	const params = {
		name: faker.person.fullName(),
		position: faker.person.jobTitle(),
	};
	function Mock() {
		return <CollaboratorViewer {...params} />;
	}
	it("Should reader strings in each field params object", () => {
		cy.mount(<Mock />);
		const fields = Object.values(params);
		for (const field of fields) {
			cy.contains("p", field).should("exist");
		}
	});
});
