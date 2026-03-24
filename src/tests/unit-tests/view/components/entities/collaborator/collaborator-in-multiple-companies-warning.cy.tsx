import { CollaboratorInMultipleCompaniesWarning } from "@/view/components/entities/collaborator/collaborator-in-multiple-companies-warning";
import "@/view/styles/globals.css";
import { v4 } from "uuid";
describe("<CollaboratorInMultipleCompaniesWarning />", () => {
	function Mock({ id = "" }: { id?: string }) {
		return <CollaboratorInMultipleCompaniesWarning id={id} />;
	}
	it("Should render warning div when this collaborator has in multiople companies", () => {
		const id = v4(); //busca no ambiente de testes por um collaborador em multiplas empresas
		cy.mount(<Mock id={id} />);
		cy.get("div[id='warning']").should("exist");
	});
	it("Should render warning div when this collaborator has in multiople companies", () => {
		const id = v4(); //busca no ambiente de testes por um collaborador que não está em multiplas empresas
		cy.mount(<Mock id={id} />);
		cy.get("div[id='warning']").should("not.exist");
	});
});
