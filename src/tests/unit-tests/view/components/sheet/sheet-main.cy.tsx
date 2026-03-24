import { ModalProvider } from "@/application/providers/modal-provider/modal-provider";
import { SheetProvider } from "@/application/providers/sheet-provider/sheet-provider";
import SheetMain from "@/view/components/sheet/sheet-main";
import "@/view/styles/globals.css";
import { faker } from "@faker-js/faker";
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

	function FormMock() {
		return <form className="w-full h-full relative">formMock</form>;
	}
	beforeEach(() => {
		cy.mount(<Mock />);
		cy.contains("button", labelOpenSheet).should("exist").click();
		cy.wait(500);
	});
	it("Should be render a FormMock ", () => {
		cy.contains("form", "formMock").should("exist");
	});
});
