import { SheetProvider } from "@/application/providers/sheet-provider/sheet-provider";
import { DataManagerSheetUseCase } from "@/view/components/data-manager/sheet-use-case";
import type { SheetMainParams } from "@/view/components/sheet/sheet-main";
import "@/view/styles/globals.css";
import { type FieldValues, useForm } from "react-hook-form";
describe("<DataManagerSheetUseCase />", () => {
	function MockWithoutParams() {
		return (
			<SheetProvider>
				<DataManagerSheetUseCase />
			</SheetProvider>
		);
	}

	function FormComponent() {
		return <form id="form">form</form>;
	}
	const params = {
		labelOpenSheet: "open",
		title: "title",
		FormComponent: <FormComponent />,
	};
	function openSheet() {
		cy.get("button").should("exist").click();
	}
	function MockWithParams<T extends FieldValues>(params: Omit<SheetMainParams<T>, "form">) {
		const form = useForm();
		return (
			<SheetProvider>
				<DataManagerSheetUseCase sheetParams={{ ...params, form }} />
			</SheetProvider>
		);
	}
	it("Shouldnt render sheet button", () => {
		cy.mount(<MockWithoutParams />);
		cy.get("button").should("not.exist");
	});
	it("Should render sheet button", () => {
		cy.mount(<MockWithParams {...params} />);
		openSheet();
		cy.get("div[role='dialog']").should("exist");
	});
	it("Should has button close-sheet", () => {
		cy.mount(<MockWithParams {...params} />);
		openSheet();
		cy.get("button[id='close-sheet']").should("exist").click();
		cy.get("div[role='dialog']").should("not.exist");
	});
	it("Should has FormComponent", () => {
		cy.mount(<MockWithParams {...params} />);
		openSheet();
		cy.get("form[id='form']").should("exist");
	});
});
