import type { PunchFormProps } from "@/domain/entities/punch";
import { PunchClockTimeViewer } from "@/view/components/forms/punch-clock/components/punch-clock-time-viewer";
import { Button } from "@/view/components/ui/button";
import "@/view/styles/globals.css";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
describe("<PunchClockTimeViewer />", () => {
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
			const time = format(now, "HH:mm:ss");
			form.setValue("date", format(now, "yyyy-MM-dd"));
			form.setValue("time", time);
			form.setValue("timestamp", time);
		}
		return (
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<PunchClockTimeViewer form={form} />
				<Button>submit</Button>
			</form>
		);
	}

	function parseTimeToSeconds(fullTime: string): number {
		if (fullTime === "") return 0;
		const [hours, minutes, seconds] = fullTime.split(":").map(Number);
		return hours * 3600 + minutes * 60 + seconds;
	}

	it("Must contain a display of hours, minutes and seconds in real time", () => {
		cy.mount(<Mock />);

		let startValue: number;
		let endValue: number;

		cy.get("span[id=dynamic-time]").should("exist");

		cy.get("span[id=dynamic-time]")
			.invoke("text")
			.then((text) => {
				startValue = parseTimeToSeconds(text);
			});

		cy.wait(1010);

		cy.get("span[id=dynamic-time]")
			.get("span[id=dynamic-time]")
			.invoke("text")
			.then((text) => {
				endValue = parseTimeToSeconds(text);
				expect(endValue).to.eq(startValue + 1);
			});
	});

	it("Must contain render local UTC time in formater (UTC{+/-}{hour}:{minutes}) Brasília", () => {
		cy.mount(<Mock />);
		const date = new Date();
		const utcMinutes = date.getTimezoneOffset();

		const sign = utcMinutes > 0 ? "-" : "+";
		const absOffset = Math.abs(utcMinutes);
		const hours = String(Math.floor(absOffset / 60)).padStart(2, "0");
		const minutes = String(absOffset % 60).padStart(2, "0");

		const utcTimeLabel = `(UTC${sign}${hours}:${minutes}) Brasília`;
		cy.get("span[id=utc-time]").should("exist").should("have.text", utcTimeLabel);
	});

	it("After submit must contain fixed time", () => {
		cy.mount(<Mock />);
		cy.get("button").click();
		cy.get("span[id=dynamic-time]").should("not.exist");
		cy.get("span[id=fixed-time]").should("exist");
	});

	it("After submit fixed time doesnt change time", () => {
		cy.mount(<Mock />);
		cy.get("button").click();
		cy.get("span[id=fixed-time]").should("exist");

		let startValue: number;
		let endValue: number;

		cy.get("span[id=fixed-time]")
			.invoke("text")
			.then((text) => {
				startValue = parseTimeToSeconds(text);
			});

		cy.wait(1010);

		cy.get("span[id=fixed-time]")
			.get("span[id=fixed-time]")
			.invoke("text")
			.then((text) => {
				endValue = parseTimeToSeconds(text);
				expect(endValue).to.eq(startValue);
			});
	});
});
