import { ModalProvider } from "@/application/providers/modal-provider/modal-provider";
import { SheetProvider, useSheet } from "@/application/providers/sheet-provider/sheet-provider";
import { SheetFooterCustomSubmit } from "@/view/components/sheet/sheet-footer-custom-submit";
import { Sheet, SheetContent } from "@/view/components/ui/sheet";
import "@/view/styles/globals.css";
import { Separator } from "@radix-ui/react-separator";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
describe("<SheetFooterCustomSubmit />", () => {
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
		const form = useForm({
			defaultValues: { name: "" },
		});
		const name = form.watch("name");
		useEffect(() => {
			setOpen(true);
		}, [setOpen]);
		// form.formState.isDirty;
		useEffect(() => {
			if (!isDirty) return;

			form.setValue("name", "qweasd", {
				shouldDirty: true,
				shouldTouch: true,
			});
		}, [form, isDirty]);
		return (
			<FormProvider {...form}>
				<Sheet open={open} modal={true}>
					<SheetContent style={{ minWidth: "50vw" }}>
						<FormProvider {...form}>
							<form className="w-full h-full relative">
								<Separator className="w-full h-[1px] bg-muted my-4" />
								<span>{name}</span>
								<SheetFooterCustomSubmit
									handleSubmit={() => {
										console.log("submit");
									}}
									onCancel={() => {
										console.log("cancel");
									}}
								/>
							</form>
						</FormProvider>
					</SheetContent>
				</Sheet>
			</FormProvider>
		);
	}
	beforeEach(() => {
		cy.mount(<Mock />);
		cy.wait(500);
		cy.window().then((win) => {
			cy.stub(win.console, "log").as("consoleLog");
		});
	});
	it("When click in cancel button should print 'cancel' in console", () => {
		cy.get("button[id='cancel']").should("exist").click();
		cy.get("@consoleLog").should("have.been.calledWith", "cancel");
	});
	it("When click in submit button should print 'submit' in console", () => {
		cy.get("button[id='submit']").should("exist").click();
		cy.get("@consoleLog").should("have.been.calledWith", "submit");
	});
});
