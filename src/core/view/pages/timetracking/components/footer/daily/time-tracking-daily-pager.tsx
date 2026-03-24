import { Button } from "@/view/components/ui/button";
import { addDays, subDays } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useContextTimeTracking } from "../../../provider/time-tracking-provider";
export function TimeTrackingDailyPager() {
	const { headerForm, dailyDate, setDailyDate } = useContextTimeTracking();
	const selectedDate = dailyDate ? dailyDate : new Date();
	const currentDate = new Date();
	const nxtDay = addDays(selectedDate, 1);
	const prsDay = subDays(selectedDate, 1);
	const firstDayOf1900 = new Date(1900, 0, 1);
	const isMaxDate = nxtDay > currentDate;
	const isMinDate = prsDay < firstDayOf1900;
	function nextDay() {
		headerForm.trigger("dailyDate");
		if (nxtDay > currentDate) return;
		setDailyDate(nxtDay);
	}
	function previousDay() {
		headerForm.trigger("dailyDate");
		if (prsDay < firstDayOf1900) return;
		setDailyDate(prsDay);
	}
	return (
		<div className="w-fit flex">
			<Button type="button" variant="ghost" onClick={() => previousDay()} disabled={isMinDate}>
				<ChevronLeft /> Dia anterior
			</Button>
			<Button type="button" variant="ghost" onClick={() => nextDay()} disabled={isMaxDate}>
				Próximo dia <ChevronRight />
			</Button>
		</div>
	);
}
