import SessionProvider from "@/application/providers/auth/session-provider";
import type { PunchFormProps } from "@/domain/entities/punch";
import { PunchClockFooterButton } from "@/view/components/forms/punch-clock/components/punch-clock-footer-button";
import "@/view/styles/globals.css";
import { useForm } from "react-hook-form";
describe("<PunchClockFooterButton />", () => {
	function Mock({ loadingButtonDisabler = false }: { loadingButtonDisabler?: boolean }) {
		const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		const form = useForm<PunchFormProps>({
			values: {
				collectorType: "WEB",
				date: "",
				time: "",
				timestamp: "",
				companyTimeZone: timezone,
				collectorId: "",
				collaboratorId: "",
				companyId: "",
				origin: "02",
				type: "01",
			},
			mode: "onSubmit",
		});
		function onSubmit() { }
		return (
			<SessionProvider>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<PunchClockFooterButton form={form} loadingButtonDisabler={loadingButtonDisabler} />
				</form>
			</SessionProvider>
		);
	}

	it("Must contain submit button", () => {
		cy.mount(<Mock />);
		cy.get("button[type=submit]").should("exist");
	});
	it("After submit must contain dowload button", () => {
		cy.mount(<Mock />);
		cy.get("button[type=submit]").should("exist").click();
		cy.get("button[id=dowload]").should("exist");
	});
	it("Must disable the submit button", () => {
		cy.mount(<Mock loadingButtonDisabler />);
		cy.get("button[type=submit]").should("exist").should("be.disabled");
	});
});
