import { type ReactNode, useEffect, useState } from "react";
import { useContextTimeTracking } from "../../provider/time-tracking-provider";
import { TimeTrackingDailyInfo } from "./daily/time-tracking-daily-info";
import { TimeTrackingDailyPager } from "./daily/time-tracking-daily-pager";
import { TimeTrackingMonthInfo } from "./monthly/time-tracking-month-info";
import { TimeTrackingMonthPager } from "./monthly/time-tracking-month-pager";
import { TimetrackingInfo } from "./timetracking/timetracking-info";
import { TimetrackingPager } from "./timetracking/timetracking-page";
function MonthlyFooter() {
	return (
		<>
			<TimeTrackingMonthInfo />
			<TimeTrackingMonthPager />
		</>
	);
}
function DailyFooter() {
	return (
		<>
			<TimeTrackingDailyInfo />
			<TimeTrackingDailyPager />
		</>
	);
}
function TimetrackingFooter() {
	return (
		<>
			<TimetrackingInfo />
			<TimetrackingPager />
		</>
	);
}
export function TimeTrackingFooter() {
	const { type, isTypeDaily, isTypeMonthly, isTypeTimetracking } = useContextTimeTracking();
	const [FooterComponents, setFooterComponents] = useState<ReactNode>(<MonthlyFooter />);
	useEffect(() => {
		if (isTypeDaily) return setFooterComponents(<DailyFooter />);
		if (isTypeMonthly) return setFooterComponents(<MonthlyFooter />);
		if (isTypeTimetracking) return setFooterComponents(<TimetrackingFooter />);
	}, [type, isTypeDaily, isTypeMonthly, isTypeTimetracking]);
	return (
		<footer className="flex w-full justify-between items-center relative">
			{FooterComponents}
		</footer>
	);
}
