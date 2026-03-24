import type { TimetrackingMonthlyResponse } from "@/domain/entities/time-tracking/grids/mothly";
import { ScrollArea, ScrollBar } from "@/view/components/ui/scroll-area";
import { ReactGrid } from "@silevis/reactgrid";
import { tv } from "tailwind-variants";
import { TimetrackingGridNoResults } from "../shared-cells/no-results";
import { SkeletonTimetrackingGrid } from "../skeleton-time-tracking-grid";
import { useTimetrackingMonthlyGrid } from "./use-time-tracking-monthly-grid";
interface TimetrackingMonthlyGridParams {
	monthlyResponse: TimetrackingMonthlyResponse[];
	isFullSreen: boolean;
	height: number;
	isLoading: boolean;
	gridWidth: number;
}
export default function TimetrackingMonthlyGrid({
	monthlyResponse,
	isFullSreen,
	height,
	isLoading,
	gridWidth,
}: TimetrackingMonthlyGridParams) {
	const { columns, rows, wrapperFormRef } = useTimetrackingMonthlyGrid({
		monthlyResponse,
		gridWidth,
	});
	const scrollAreaVariants = tv({
		base: "w-full h-full rounded-lg relative col-span-2",
		variants: {
			isFullSreen: {
				true: "sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[85vh] 2xl:h-[88vh]",
				false: "sm:h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[75vh] 2xl:h-[78vh]",
			},
		},
	});
	if (isLoading) return <SkeletonTimetrackingGrid height={height} />;
	if (!monthlyResponse) return <TimetrackingGridNoResults height={height} />;
	return (
		<div ref={wrapperFormRef} className="">
			<div className="w-full border rounded-lg grid grid-cols-2 ">
				<ScrollArea
					className={scrollAreaVariants({ isFullSreen })}
					type="always"
					style={{
						height,
					}}
					scrollBarClassName="h-[calc(100%-36px)]"
					scrollBarStyle={{
						top: "38px",
					}}
				>
					<ReactGrid rows={rows} columns={columns} stickyTopRows={1} />
					<ScrollBar orientation="horizontal" style={{ bottom: "-12.5px" }} className="w-full" />
				</ScrollArea>
			</div>
		</div>
	);
}
