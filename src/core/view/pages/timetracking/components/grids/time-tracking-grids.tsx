import { useScreen } from "@/application/providers/screen/screen-provider";
import type { ChildrenReactNode } from "@/domain/children";
import { TimeTrackingTypeEnum } from "@/domain/entities/time-tracking/header-form";
import { useQueryState } from "nuqs";
import { useContextTimeTracking } from "../../provider/time-tracking-provider";
import TimetrackingDailyGrid from "./daily/timetracking-daily-grid";
import TimetrackingMonthlyGrid from "./monthly/time-tracking-monthly-grid";
import TimetrackingGrid from "./timetracking/timetracking-grid";

function GridLayout({ children }: ChildrenReactNode) {
	return <div className="h-full w-full max-h-full">{children}</div>;
}
interface TimetrackingGridsParams {
	height: number;
	gridWidth: number;
}
export function TimetrackingGrids({ height, gridWidth }: TimetrackingGridsParams) {
	const {
		monthlyResponse,
		dailyResponse,
		timetrackingResponse,
		dailyIsLoading,
		monthlyIsLoading,
		timetrackingIsLoading,
	} = useContextTimeTracking();
	const [typeQueryState] = useQueryState("type", {
		history: "replace",
		shallow: true,
		clearOnDefault: false,
	});
	const { isFullScreen } = useScreen();
	const { daily, monthly, timetracking } = TimeTrackingTypeEnum;
	const grid = {
		[daily]: (
			<TimetrackingDailyGrid
				dailyResponse={dailyResponse}
				isFullScreen={isFullScreen}
				height={height}
				isLoading={dailyIsLoading}
			/>
		),
		[monthly]: (
			<TimetrackingMonthlyGrid
				monthlyResponse={monthlyResponse}
				isFullSreen={isFullScreen}
				height={height}
				isLoading={monthlyIsLoading}
				gridWidth={gridWidth}
			/>
		),
		[timetracking]: (
			<TimetrackingGrid
				timetrackingResponse={timetrackingResponse}
				isFullScreen={isFullScreen}
				height={height}
				isLoading={timetrackingIsLoading}
			/>
		),
	};

	return <GridLayout>{grid[typeQueryState as TimeTrackingTypeEnum]}</GridLayout>;
}
