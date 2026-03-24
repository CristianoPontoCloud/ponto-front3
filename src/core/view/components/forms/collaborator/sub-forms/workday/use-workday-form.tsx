import { type ReactNode, useState } from "react";
import { WorkdayExtraHourView } from "./tabs/extra-hour/workday-extra-hour-view";
import { WorkdayHourBankView } from "./tabs/hour-bank/workday-hour-bank-view";
import { WorkdayTurnView } from "./tabs/turn/workday-turn-view";

type WorkDayTabsObject = Record<"turn" | "extraHour" | "hourBank", ReactNode>;

export function useWorkDayForm() {
	const workDayTabs: WorkDayTabsObject = {
		turn: <WorkdayTurnView />,
		extraHour: <WorkdayExtraHourView />,
		hourBank: <WorkdayHourBankView />,
	};
	const [TabRender, setTabRender] = useState<ReactNode>(workDayTabs.turn);
	function onTabChange(tab: keyof WorkDayTabsObject) {
		setTabRender(workDayTabs[tab]);
	}
	return {
		TabRender,
		onTabChange,
	};
}
