import { CollaboratorStatusEnum } from "@/domain/entities/collaborator/collaborator-status";
import { CollaboratorCell } from "@/view/components/entities/collaborator/collaborator-cell";
import "@/view/styles/globals.css";
import { faker } from "@faker-js/faker";
describe("<CollaboratorCell />", () => {
	const { active, dismissed } = CollaboratorStatusEnum;
	const name = faker.person.fullName();
	function Mock({ status = active, src = "" }: { status?: CollaboratorStatusEnum; src?: string }) {
		return <CollaboratorCell name={name} status={status} src={src} />;
	}
	it(`Should render ${name}`, () => {
		cy.mount(<Mock />);
		cy.contains("div", name).should("exist");
	});
	it("Should render svg with class lucide-user-round when src isnt valid path", () => {
		cy.mount(<Mock />);
		cy.get("svg").should("have.class", "lucide-user-round");
	});
	it("Should render svg with class lucide-user-round when src isnt valid path", () => {
		cy.mount(<Mock />);
		cy.get("svg").should("have.class", "lucide-user-round");
	});
	it("Should render img when src is a valid path", () => {
		cy.mount(<Mock src="add/valid/path/for/tests.png" />);
		cy.get("img").should("exist");
	});
	it("Should add grayscale in img when status is dismissed", () => {
		cy.mount(<Mock src="add/valid/path/for/tests.png" status={dismissed} />);
		cy.get("img").should("have.class", "filter grayscale");
	});
});
