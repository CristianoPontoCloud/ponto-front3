import { ModalProvider } from "@/application/providers/modal-provider/modal-provider";
import { SheetProvider } from "@/application/providers/sheet-provider/sheet-provider";
import type { SheetMenuItem } from "@/domain/components/sheet/sheet-menu-lateral";
import SheetMain from "@/view/components/sheet/sheet-main";
import SheetMenuLateral from "@/view/components/sheet/sheet-menu-lateral";
import "@/view/styles/globals.css";
import { faker } from "@faker-js/faker";
import { User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
describe("<SheetMain />", () => {
	const title = faker.commerce.department();
	const labelOpenSheet = faker.commerce.product();
	function Mock() {
		const form = useForm();
		return (
			<ModalProvider>
				<SheetProvider>
					<SheetMain
						FormComponent={<FormMock />}
						title={title}
						form={form}
						labelOpenSheet={labelOpenSheet}
					/>
				</SheetProvider>
			</ModalProvider>
		);
	}
	const formAContent = "Form A";
	const formBContent = "Form B";
	const initialForm = {
		id: 0,
		FormComponent: () => <form>{formAContent}</form>,
	};
	const formA: SheetMenuItem = {
		form: initialForm,
		label: formAContent,
		Icon: User,
		errorMapFields: [],
	};
	const formB: SheetMenuItem = {
		form: {
			id: 1,
			FormComponent: () => <form>{formBContent}</form>,
		},
		label: formBContent,
		Icon: User,
		errorMapFields: [],
	};
	const menuItems = [formA, formB];
	function FormMock() {
		const [form, setForm] = useState<SheetMenuItem["form"]>(initialForm);
		return (
			<div>
				<SheetMenuLateral
					setFormForRender={setForm}
					currentFormId={form.id}
					menuItems={menuItems}
				/>
				<form.FormComponent />
			</div>
		);
	}
	beforeEach(() => {
		cy.mount(<Mock />);
		cy.contains("button", labelOpenSheet).should("exist").click();
		cy.wait(500);
	});
	it("Should be render initial form", () => {
		cy.contains("form", formAContent).should("exist");
	});
	it("Should be render buttons with label text, when click it should change the form", () => {
		for (const { label } of menuItems) {
			cy.contains("button", label).should("exist").click();
			cy.contains("form", label).should("exist");
		}
	});
});
