import { Button } from "@/view/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useContextTimeTracking } from "../../../provider/time-tracking-provider";
export function TimetrackingPager() {
	const { headerForm } = useContextTimeTracking();
	const { dateFrom, dateTo } = headerForm.watch();
	if (!dateFrom || !dateTo) return;
	const date = new Date();
	const nextLimitDate = new Date(date.getFullYear(), date.getMonth(), 0);
	const previousLimitDate = new Date(date.getFullYear(), date.getMonth() - 2, 1);
	const previousDisabler = dateFrom < previousLimitDate || dateTo < previousLimitDate;
	const nextDisabler = dateFrom > nextLimitDate || dateTo > nextLimitDate;
	function previousMonth() {
		const df = dateFrom ?? new Date();
		const dt = dateTo ?? new Date();
		const lastDay = new Date(dt.getFullYear(), dt.getMonth(), 0);
		lastDay.setDate(lastDay.getDate() + 1);
		headerForm.setValue("dateFrom", new Date(df.getFullYear(), df.getMonth() - 1, 1));
		headerForm.setValue("dateTo", lastDay);
		headerForm.trigger("dateFrom");
		headerForm.trigger("dateTo");
	}
	function nextMonth() {
		const df = dateFrom ?? new Date();
		const dt = dateTo ?? new Date();
		const lastDay = new Date(dt.getFullYear(), dt.getMonth() + 2, 0);
		lastDay.setDate(lastDay.getDate() + 1);
		headerForm.setValue("dateFrom", new Date(df.getFullYear(), df.getMonth() + 1, 1));
		headerForm.setValue("dateTo", lastDay);
		headerForm.trigger("dateFrom");
		headerForm.trigger("dateTo");
	}

	return (
		<div className="w-fit flex">
			<Button type="button" variant="ghost" onClick={previousMonth} disabled={previousDisabler}>
				<ChevronLeft /> Anterior
			</Button>
			<Button type="button" variant="ghost" disabled={nextDisabler} onClick={nextMonth}>
				Próximo <ChevronRight />
			</Button>
		</div>
	);
}
