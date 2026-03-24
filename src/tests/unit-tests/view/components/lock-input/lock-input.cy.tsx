import { ModalProvider } from "@/application/providers/modal-provider/modal-provider";
import { LockInput } from "@/view/components/lock-input/lock-input";
import "@/view/styles/globals.css";
import { FormProvider, useForm } from "react-hook-form";
describe("<LockInput />", () => {
	const modal = {
		title: "title",
		description: "description",
	};
	function Mock() {
		const form = useForm();
		return (
			<ModalProvider>
				<FormProvider {...form}>
					<LockInput
						inputParams={{
							form,
							formFieldName: "name",
						}}
						modal={modal}
					/>
				</FormProvider>
			</ModalProvider>
		);
	}
	function getInput() {
		return cy.get("input[id='name']");
	}
	function getButtonOpenModal() {
		return cy.get("button[id='open-unlock-input-modal']");
	}
	function getModal() {
		return cy.get("div[role='dialog']");
	}
	it("Should render input", () => {
		cy.mount(<Mock />);
		getInput().should("exist");
	});
	it("Should render button with id 'open-unlock-input-modal'", () => {
		cy.mount(<Mock />);
		getButtonOpenModal().should("exist");
	});
	it("Should disabled input param", () => {
		cy.mount(<Mock />);
		getInput().should("be.disabled");
	});
	it("Should disabled input param", () => {
		cy.mount(<Mock />);
		getInput().should("be.disabled");
	});
	it("Should enabled input after confirm modal", () => {
		cy.mount(<Mock />);
		getButtonOpenModal().should("exist").click();
		getModal().should("exist");
		cy.contains("h2", modal.title).should("exist");
		cy.contains("p", modal.description).should("exist");
		cy.contains("button", "Cancelar").should("exist");
		cy.contains("button", "Continuar").should("exist").click();
		getButtonOpenModal().should("not.exist");
		getInput().should("not.be.disabled");
	});
});
