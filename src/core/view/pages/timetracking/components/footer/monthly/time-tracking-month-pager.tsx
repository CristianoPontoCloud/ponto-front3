import { Button } from "@/view/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useContextTimeTracking } from "../../../provider/time-tracking-provider";
export function TimeTrackingMonthPager() {
	const { headerForm, setMonthlyDate } = useContextTimeTracking();
	const selectedDate = headerForm.getValues("monthlyDate");
	const [year, month] = (selectedDate ?? "")
		.toString()
		.split("-")
		.map((value) => Number(value));
	const nrSelectedMonth = month;
	const selectedYear = year;
	const currentDate = new Date();
	const currentMonth = currentDate.getMonth() + 1;
	const currentYear = currentDate.getFullYear();
	const isSelectedLastMonth = nrSelectedMonth === 12;
	const isSelectedFirstMonth = nrSelectedMonth === 1;
	const isMaxDate = currentMonth === nrSelectedMonth && currentYear === selectedYear;
	const isMinDate = isSelectedFirstMonth && selectedYear === 1900;
	function nextMonth() {
		headerForm.trigger("monthlyDate");
		if (isMaxDate) return;
		if (isSelectedLastMonth && selectedYear + 1 > currentYear) return;
		if (isSelectedLastMonth && selectedYear + 1 <= currentYear) {
			setMonthlyDate(`${selectedYear + 1}-01`);
			return;
		}
		const nxtMonth = (nrSelectedMonth + 1).toString().padStart(2, "0");
		setMonthlyDate(`${selectedYear}-${nxtMonth}`);
	}
	function previiousMonth() {
		headerForm.trigger("monthlyDate");
		if (isMinDate) return;
		if (isSelectedFirstMonth && selectedYear - 1 < 1900) return;
		if (isSelectedFirstMonth && selectedYear - 1 < currentYear) {
			setMonthlyDate(`${selectedYear - 1}-12`);
			return;
		}
		const prtMonth = (nrSelectedMonth - 1).toString().padStart(2, "0");
		setMonthlyDate(`${selectedYear}-${prtMonth}`);
	}
	return (
		<div className="w-fit flex">
			<Button type="button" variant="ghost" onClick={() => previiousMonth()} disabled={isMinDate}>
				<ChevronLeft /> Mês anterior
			</Button>
			<Button type="button" variant="ghost" onClick={() => nextMonth()} disabled={isMaxDate}>
				Próximo mês <ChevronRight />
			</Button>
		</div>
	);
}
