import type { PunchFormProps } from "@/domain/entities/punch";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import type { UseFormReturn } from "react-hook-form";

interface PunchClockTimeViewerParams {
	form: UseFormReturn<PunchFormProps>;
}
export function PunchClockTimeViewer({ form }: PunchClockTimeViewerParams) {
	const [timeViewer, setTimeViewer] = useState(new Date());
	const time = form.watch("time");

	useEffect(() => {
		const timer = setInterval(() => {
			const now = new Date();
			setTimeViewer(now);
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	function showOffset() {
		const date = new Date();
		const utcMinutes = date.getTimezoneOffset();

		const sign = utcMinutes > 0 ? "-" : "+";
		const absOffset = Math.abs(utcMinutes);
		const hours = String(Math.floor(absOffset / 60)).padStart(2, "0");
		const minutes = String(absOffset % 60).padStart(2, "0");

		return `(UTC${sign}${hours}:${minutes}) Brasília`;
	}

	return (
		<div className="w-full p-4 border rounded-md flex flex-col items-center" id="time-viewer">
			{!form.formState.isSubmitSuccessful && (
				<span className="text-3xl font-semibold text-primary" id="dynamic-time">
					{format(timeViewer, "HH:mm:ss")}
				</span>
			)}
			{form.formState.isSubmitSuccessful && (
				<span className="text-3xl font-semibold text-primary" id="fixed-time">
					{time}
				</span>
			)}
			<span id="utc-time">{showOffset()}</span>
		</div>
	);
}
