import { ModalProvider } from "@/application/providers/modal-provider/modal-provider";
import { CollaboratorCodeGenerator } from "@/view/components/entities/collaborator/collaborator-code-generator";
import "@/view/styles/globals.css";
describe("<CollaboratorCodeGenerator />", () => {
	function Mock({ id = "" }: { id?: string }) {
		return (
			<ModalProvider>
				<CollaboratorCodeGenerator id={id} />
			</ModalProvider>
		);
	}
	it("Should render span with code", () => {
		cy.mount(<Mock />);
		cy.get("span[id='code']").should("exist");
	});
	it("Should render code-copy when id is undefined", () => {
		cy.mount(<Mock />);
		cy.get("button[id='code-copy']").should("exist");
	});
	it("Should copy text in code when click in code-copy", () => {
		cy.mount(<Mock />);
		cy.window().then((win) => {
			if (!win.navigator.clipboard) {
				Object.defineProperty(win.navigator, "clipboard", {
					value: {},
				});
			}
			cy.stub(win.navigator.clipboard, "writeText").as("writeText");
			cy.stub(win.navigator.clipboard, "readText").as("readText");
		});

		cy.get("button[id='code-copy']").click();
		cy.get("span[id='code']")
			.invoke("text")
			.then((text) => {
				cy.get("@writeText").should("have.been.calledWith", text);
			});
	});
	it("Should render call-modal button when id isnt undefined", () => {
		cy.mount(<Mock id="asd" />);
		cy.get("button[id='call-modal']").should("exist");
	});
	it("Should open modal when click in call-modal button", () => {
		cy.mount(<Mock id="asd" />);
		cy.get("button[id='call-modal']").click();
		cy.get("div[role='dialog']").should("exist");
	});
	it("Should close modal and generate code when click in 'Continuar' button", () => {
		cy.mount(<Mock id="asd" />);
		cy.get("span[id='code']").should("not.exist");
		cy.get("button[id='call-modal']").click();
		cy.get("div[role='dialog']").should("exist");
		cy.get("button[id='code-genarate']").should("exist").click();
		cy.get("span[id='code']").should("exist");
	});
});
