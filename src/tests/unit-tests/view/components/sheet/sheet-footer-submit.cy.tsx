import { ModalProvider } from "@/application/providers/modal-provider/modal-provider";
import { SheetProvider, useSheet } from "@/application/providers/sheet-provider/sheet-provider";
import { SheetFooterSubmit } from "@/view/components/sheet/sheet-footer-submit";
import { Sheet, SheetContent } from "@/view/components/ui/sheet";
import "@/view/styles/globals.css";
import { Separator } from "@radix-ui/react-separator";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
describe("<SheetFooterSubmit />", () => {
	function Mock({ isDirty = false }: { isDirty?: boolean }) {
		return (
			<ModalProvider>
				<SheetProvider>
					<FormMock isDirty={isDirty} />
				</SheetProvider>
			</ModalProvider>
		);
	}
	function FormMock({ isDirty = false }: { isDirty?: boolean }) {
		const { setOpen, open } = useSheet();
		const form = useForm({ values: { name: "" } });
		const name = form.watch("name");
		useEffect(() => {
			setOpen(true);
		}, [setOpen]);
		useEffect(() => {
			if (!isDirty) return;

			form.setValue("name", "qweasd", {
				shouldDirty: true,
				shouldTouch: true,
			});
		}, [form, isDirty]);
		// form.formState.isDirty; // não remova essa linha, por algum motivo o isDirty continua false e n chama o modal
		return (
			<FormProvider {...form}>
				<Sheet open={open} modal={true}>
					<SheetContent style={{ minWidth: "50vw" }}>
						<FormProvider {...form}>
							<form className="w-full h-full relative">
								<Separator className="w-full h-[1px] bg-muted my-4" />
								{name}
								<SheetFooterSubmit />
							</form>
						</FormProvider>
					</SheetContent>
				</Sheet>
			</FormProvider>
		);
	}

	it("When click in cancel button should be close sheet", () => {
		cy.mount(<Mock />);
	});
	describe("Cancel flux - isDirty = false", () => {
		beforeEach(() => {
			cy.mount(<Mock />);
			cy.wait(500);
		});
		it("When click in cancel button should be close sheet", () => {
			cy.get("button[id='cancel']").should("exist").click();
			cy.get("div[role='dialog']").should("not.exist");
		});
		it("Should be render submit button", () => {
			cy.get("button[type='submit']").should("exist");
		});
	});
	describe("Cancel flux - isDirty = true", () => {
		beforeEach(() => {
			cy.mount(<Mock isDirty />);
			cy.wait(1000);
		});
		it("When click in cancel button show modal warning for discard changes in forms, and when click in close-and-discart button should be close modal and sheet", () => {
			cy.get("button[id='cancel']").should("exist").click();
			cy.get("button[id='close-and-discart']").click();
			cy.get("div[role='dialog']").should("not.exist");
		});
		it("When click in submit button should be close sheet", () => {
			cy.get("button[id='cancel']").should("exist").click();
			cy.get("button[id='save-and-continue']").should("exist").click();
			cy.get("div[role='dialog']").should("not.exist");
		});
	});
});
