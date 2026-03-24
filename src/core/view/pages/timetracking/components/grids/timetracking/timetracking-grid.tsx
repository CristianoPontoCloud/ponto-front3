import type { MarkTimetrackingResponse } from "@/domain/entities/marks/mark-view-timetracking-data";
import { HourCellTemplate } from "@/view/components/react-grid/cells/hour-cells";
import { ScrollArea, ScrollBar } from "@/view/components/ui/scroll-area";
import { ReactGrid } from "@silevis/reactgrid";
import { tv } from "tailwind-variants";
import { TimetrackingGridNoResults } from "../shared-cells/no-results";
import { SkeletonTimetrackingGrid } from "../skeleton-time-tracking-grid";
import { useTimetrackingGrid } from "./use-timetracking-grid";
interface TimetrackingGridParams {
	timetrackingResponse?: MarkTimetrackingResponse;
	isFullScreen: boolean;
	height: number;
	isLoading: boolean;
}
export default function TimetrackingGrid({
	timetrackingResponse,
	isFullScreen,
	height,
	isLoading,
}: TimetrackingGridParams) {
	const { columns, fixColumns, rows } = useTimetrackingGrid({
		timetrackingResponse,
	});
	const scrollAreaVariants = tv({
		base: "w-full h-full rounded-lg relative col-span-2",
		variants: {
			isFullScreen: {
				true: "sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[85vh] 2xl:h-[88vh]",
				false: "sm:h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[75vh] 2xl:h-[78vh]",
			},
		},
	});
	if (isLoading) return <SkeletonTimetrackingGrid height={height} />;
	if (!timetrackingResponse) return <TimetrackingGridNoResults height={height} />;

	return (
		<div>
			<div className="w-full border rounded-lg grid grid-cols-2 ">
				<ScrollArea
					className={scrollAreaVariants({ isFullScreen })}
					type="always"
					style={{
						height,
					}}
					scrollBarClassName="h-[calc(100%-36px)]"
					scrollBarStyle={{
						top: "38px",
					}}
				>
					<ReactGrid
						rows={rows}
						columns={columns}
						moveRightOnEnter
						enableFillHandle
						enableRangeSelection
						stickyTopRows={1}
						stickyLeftColumns={fixColumns}
						stickyBottomRows={1}
						customCellTemplates={{ hour: new HourCellTemplate() }}
					/>
					<ScrollBar orientation="horizontal" style={{ bottom: "-12.5px" }} />
				</ScrollArea>
			</div>
		</div>
	);
}
