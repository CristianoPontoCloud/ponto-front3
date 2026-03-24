import { ModalProvider, useModal } from "@/application/providers/modal-provider/modal-provider";
import { ModalFooterSubmit } from "@/view/components/modal/modal-footer-submit";
import "@/view/styles/globals.css";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
describe("<ModalFooterSubmit />", () => {
	function MockWithProviders() {
		return (
			<ModalProvider>
				<Mock />
			</ModalProvider>
		);
	}

	function Mock() {
		const { setModalAndOpen } = useModal();
		const form = useForm();

		useEffect(() => {
			setModalAndOpen({
				content: (
					<FormProvider {...form}>
						<form onSubmit={() => {}}>
							<ModalFooterSubmit />
						</form>
					</FormProvider>
				),
			});
		});
		return <div />;
	}
	it("Should render 'Cancelar' e 'Continuar' buttons in modal", () => {
		cy.mount(<MockWithProviders />);
		cy.get("div[role='dialog']").should("exist");
		cy.get("div[id='modal-footer-submit']").should("exist");
		cy.contains("button", "Cancelar").should("exist");
		cy.contains("button", "Salvar").should("exist").should("have.attr", "type", "submit");
	});
});
