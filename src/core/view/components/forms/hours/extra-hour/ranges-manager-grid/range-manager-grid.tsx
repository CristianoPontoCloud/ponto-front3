import type { ExtraHourRules } from "@/domain/entities/extra-hour/extra-hour-rules";
import { AccumulatedHourCellTemplate } from "@/view/components/react-grid/cells/accumulated-hour-cells";
import { PercentCellTemplate } from "@/view/components/react-grid/cells/percent-cells";
import { ReactGrid } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import type { UseFormReturn } from "react-hook-form";
import { HourCellTemplate } from "../../../../react-grid/cells/hour-cells";
import { ScrollArea, ScrollBar } from "../../../../ui/scroll-area";
import { useExtraHourRuleManagerGrid } from "./use-range-manager-grid";

interface ExtraHourRulesManagerGridParams {
	form: UseFormReturn<ExtraHourRules>;
	overSheetIsOpen: boolean;
	height: number;
}

export function ExtraHourRulesManagerGrid({
	form,
	overSheetIsOpen,
	height,
}: ExtraHourRulesManagerGridParams) {
	const { columns, rows, wrapperFormRef, rulesIsEmpty, rulesController } =
		useExtraHourRuleManagerGrid({ form, overSheetIsOpen });
	if (rulesIsEmpty) {
		return (
			<div
				className="w-full border-spacing-4 border-background-foreground border-[1px] border-dashed rounded-lg flex flex-col gap-4 justify-center items-center"
				style={{
					maxHeight: height - 100,
				}}
				ref={wrapperFormRef}
			>
				<p className="text-2xl font-bold">Adicione a primeira faixa</p>
				<p>Para adicionar, clique no botão no canto superior direito.</p>
			</div>
		);
	}

	return (
		<div ref={wrapperFormRef}>
			<div className="w-full grid grid-cols-2 pr-3">
				<ScrollArea
					className="w-full  rounded-lg border relative col-span-2"
					type="auto"
					style={{
						maxHeight: height - 100,
					}}
				>
					<ReactGrid
						rows={rows}
						columns={columns}
						stickyTopRows={1}
						enableFillHandle
						moveRightOnEnter
						enableRangeSelection
						onCellsChanged={(changes) => {
							rulesController.onCellsChanged(changes);
						}}
						customCellTemplates={{
							hour: new HourCellTemplate(),
							percent: new PercentCellTemplate(),
							accumulatedHour: new AccumulatedHourCellTemplate(),
						}}
					/>
					<ScrollBar orientation="horizontal" style={{ bottom: "-12.5px" }} />
				</ScrollArea>
			</div>
		</div>
	);
}
