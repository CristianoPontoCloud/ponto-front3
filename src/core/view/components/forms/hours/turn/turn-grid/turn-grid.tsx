import type { TurnFormProps } from "@/domain/entities/turns/turns";
import { HourCellTemplate } from "@/view/components/react-grid/cells/hour-cells";
import { ReactGrid } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import type { UseFormReturn } from "react-hook-form";
import { ScrollArea, ScrollBar } from "../../../../ui/scroll-area";
import { turnGridActions } from "./turn-grid-actions";
import { useTurnGrid } from "./use-turn-grid";

interface TurnGridParams {
	form: UseFormReturn<TurnFormProps>;
	height: number;
}

export function TurnGrid({ form, height }: TurnGridParams) {
	// const {
	// 	// columns,
	// 	// rows,
	// 	// onCellsChanged,
	// 	// totalHourInTurn,
	// 	// wrapperFormRef,
	// 	// periods,
	// 	// daysState,
	// 	// setDaysState,
	// 	// currentCellLocation,
	// 	// setCurrentCellLocation,
	// 	// cycleDays,
	// } = useTurnGrid({ form });

	const {
		columns,
		currentCellLocation,
		cycleDays,
		daysState,
		onCellsChanged,
		periods,
		rows,
		setCurrentCellLocation,
		setDaysState,
		totalHourInTurn,
		wrapperFormRef,
	} = useTurnGrid({ form });
	return (
		<div className="h-full">
			<div className="w-full grid grid-cols-2 pr-3">
				<ScrollArea
					ref={wrapperFormRef}
					className={"w-full rounded-lg border relative col-span-2 teste-bottom"}
					type="always"
					scrollBar="outside"
					style={{
						maxHeight: height,
					}}
					scrollBarClassName="h-[calc(100%-36px)]"
					scrollBarStyle={{
						top: "38px",
					}}
				>
					<ReactGrid
						rows={rows}
						columns={columns}
						stickyLeftColumns={1}
						stickyRightColumns={4}
						stickyTopRows={1}
						moveRightOnEnter
						enableFillHandle
						enableRangeSelection
						focusLocation={currentCellLocation}
						onFocusLocationChanging={(nextLocation) => {
							return turnGridActions.onFocusChanging({
								nextLocation,
								currentCellLocation,
								setCurrentCellLocation,
								cycleDays,
							});
						}}
						customCellTemplates={{ hour: new HourCellTemplate() }}
						onCellsChanged={(changes) =>
							onCellsChanged({ changes, days: daysState, form, periods, setDays: setDaysState })
						}
					/>
					<ScrollBar
						orientation="horizontal"
						style={{ bottom: "-12.5px", left: "44px" }}
						className="w-[calc(100%-292px)]"
					/>
				</ScrollArea>
			</div>
			<div className="flex w-full justify-end mt-[10px] pr-[12px]">{`Carga horária total: ${totalHourInTurn}`}</div>
		</div>
	);
}
