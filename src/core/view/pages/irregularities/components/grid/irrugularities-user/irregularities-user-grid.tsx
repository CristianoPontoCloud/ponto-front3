import { IrregularitiesTypeEnum } from "@/domain/entities/irregularities/irregularities";
import { HourCellTemplate } from "@/view/components/react-grid/cells/hour-cells";
import { ScrollArea, ScrollBar } from "@/view/components/ui/scroll-area";
import { TimetrackingGridNoResults } from "@/view/pages/timetracking/components/grids/shared-cells/no-results";
import { SkeletonTimetrackingGrid } from "@/view/pages/timetracking/components/grids/skeleton-time-tracking-grid";
import { ReactGrid } from "@silevis/reactgrid";
import { tv } from "tailwind-variants";
import { useContextIrregularities } from "../../irregularities-provider";
import { useIrregularitiesUserGrid } from "./use-irregularities-user-grid";

interface IrregularitiesUserGridParams {
	isFullScreen: boolean;
	height: number;
}
export default function IrregularitiesUserGrid({
	isFullScreen,
	height,
}: IrregularitiesUserGridParams) {
	const { loadingResponse, irregularitiesResponse, form } = useContextIrregularities();
	const showCollaboratorColumn = form.watch("type") === IrregularitiesTypeEnum.COMPANY;
	const { columns, rows, fixColumns } = useIrregularitiesUserGrid({
		response: irregularitiesResponse,
		showCollaboratorColumn,
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
	if (loadingResponse) return <SkeletonTimetrackingGrid height={height} />;
	if (!irregularitiesResponse) return <TimetrackingGridNoResults height={height} />;

	return (
		<div className="">
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
						// style={{ flex: 1, height: "100%" }}
					/>
					<ScrollBar orientation="horizontal" style={{ bottom: "-12.5px" }} />
				</ScrollArea>
			</div>
		</div>
	);
}
