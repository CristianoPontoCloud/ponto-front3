import { ModalProvider } from "@/application/providers/modal-provider/modal-provider";
import { PunchClockTypeTabs } from "@/view/components/forms/punch-clock/components/punch-clock-type-tabs";
import { usePunchClockModalForm } from "@/view/components/forms/punch-clock/use-punch-clock-modal-form";
import { Button } from "@/view/components/ui/button";
import "@/view/styles/globals.css";
import { SessionProvider } from "next-auth/react";
describe("<PunchClockTypeTabs />", () => {
	function PunchClockTypeTabsMock() {
		const { form, onPinValueChange, onTabChange, type, pin } = usePunchClockModalForm();
		return (
			<>
				<form onSubmit={form.handleSubmit(() => {})}>
					<PunchClockTypeTabs
						form={form}
						onPinValueChange={onPinValueChange}
						onTabChange={onTabChange}
						type={type}
						pin={pin}
					/>
					<Button type="submit">submit</Button>
				</form>
			</>
		);
	}
	function Mock() {
		return (
			<SessionProvider>
				<ModalProvider>
					<PunchClockTypeTabsMock />
				</ModalProvider>
			</SessionProvider>
		);
	}

	it("Form must contain render Tabs", () => {
		cy.mount(<Mock />);
		cy.get("div[id=tabs-type]").should("exist");
	});
	it("Change content of type-container", () => {
		cy.mount(<Mock />);
		cy.get("div[id=type-container]").should("exist");
		cy.get("button[id=pin-option").should("exist").click();
	});
	it("After sumbit must doesnt render type-container ", () => {
		cy.mount(<Mock />);
		cy.get("input").type("123456");
		cy.get("button[type=submit]").click({ force: true });
		cy.get("div[id=type-container]").should("not.exist");
	});
});
