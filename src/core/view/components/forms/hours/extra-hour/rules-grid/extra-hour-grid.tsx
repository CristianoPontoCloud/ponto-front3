import type { ExtraHourFormProps } from "@/domain/entities/extra-hour/extra-hour";
import { ReactGrid } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import type { UseFormReturn } from "react-hook-form";
import { HourCellTemplate } from "../../../../react-grid/cells/hour-cells";
import { ScrollArea, ScrollBar } from "../../../../ui/scroll-area";
import type { extraHourRulesGridController } from "./extra-hour-grid-controller";
import { useExtraHourGrid } from "./use-extra-hour-grid";

interface ExtraHourGridParams {
	form: UseFormReturn<ExtraHourFormProps>;
	actions: extraHourRulesGridController;
	height: number;
}

export function ExtraHourGrid({ form, actions, height }: ExtraHourGridParams) {
	const { columns, rows, wrapperFormRef, bracketsIsEmpty } = useExtraHourGrid({
		form,
		actions,
	});
	if (bracketsIsEmpty) {
		return (
			<div
				className="w-full border-spacing-4 border-background-foreground border-[1px] border-dashed rounded-lg flex flex-col gap-4 justify-center items-center"
				ref={wrapperFormRef}
				style={{
					height: height,
				}}
			>
				<p className="text-2xl font-bold">Adicione a primeira regra de hora extra</p>
				<p>Para adicionar, clique no botão no canto superior direito.</p>
			</div>
		);
	}

	return (
		<div ref={wrapperFormRef} className="overflow-hidden ">
			<div className="w-full border rounded-lg grid grid-cols-2 overflow-hidden">
				<ScrollArea
					className="w-full rounded-lg relative col-span-2"
					type="always"
					style={{
						height: height,
					}}
				>
					<ReactGrid
						rows={rows}
						columns={columns}
						moveRightOnEnter
						enableFillHandle
						enableRangeSelection
						customCellTemplates={{ hour: new HourCellTemplate() }}
					/>
					<ScrollBar orientation="horizontal" style={{ bottom: "-12.5px" }} />
				</ScrollArea>
			</div>
		</div>
	);
}
