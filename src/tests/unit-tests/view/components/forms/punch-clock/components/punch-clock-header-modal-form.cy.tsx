import SessionProvider from "@/application/providers/auth/session-provider";
import type { PunchFormProps } from "@/domain/entities/punch";
import { PunchClockHeaderModalForm } from "@/view/components/forms/punch-clock/components/punch-clock-header-modal-form";
import { Button } from "@/view/components/ui/button";
import "@/view/styles/globals.css";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
describe("<PunchClockHeaderModalForm />", () => {
	function Mock() {
		const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		const form = useForm<PunchFormProps>({
			values: {
				collectorType: "WEB",
				collaboratorId: "",
				companyId: "",
				origin: "02",
				type: "01",
				date: "",
				time: "",
				timestamp: "",
				companyTimeZone: timezone,
				collectorId: "",
			},
			mode: "onSubmit",
		});
		async function onSubmit() {
			const now = new Date();
			const time = format(now, "yyyy-MM-dd'T'HH:mm:ssXXX");
			form.setValue("date", format(now, "yyyy-MM-dd"));
			form.setValue("time", time);
			form.setValue("timestamp", time);
		}
		return (
			<SessionProvider>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<PunchClockHeaderModalForm form={form} />
					<Button>submit</Button>
				</form>
			</SessionProvider>
		);
	}

	it("Must contain a div with before-submit id and p specific for user name and position", () => {
		cy.mount(<Mock />);
		cy.get("div[id=before-submit]").should("exist");
		cy.get("p[id=user-full-name]").should("exist");
		cy.get("p[id=user-position]").should("exist");
		cy.get("svg[id=user-round-icon]").should("exist");
	});
	it("After submit must contain a div with after-submit id, clock icon and a success message", () => {
		cy.mount(<Mock />);
		cy.get("button").click();
		cy.get("div[id=after-submit]").should("exist");
		cy.get("p[id=success-message]").should("exist");
	});
});
