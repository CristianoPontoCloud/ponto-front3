import { useContextSheetContentController } from "@/application/providers/sheet-content/sheet-component-provider";
import type { MarkFormProps } from "@/domain/entities/marks/desconsider-marks";
import type {
	EntryAndOutKey,
	MarkEntriesAndOutsDetailsRequired,
	MarkStatusEnum,
} from "@/domain/entities/marks/marks";
import type { CollaboratorWithTurnParams } from "@/domain/entities/time-tracking/timetraking-collaborator";
import {
	MarkSheetForm,
	MarkSheetFormHeader,
} from "@/view/components/forms/mark/mark/mark-sheet-form";
import { Tooltip, TooltipProvider, TooltipTrigger } from "@/view/components/ui/tooltip";
import { MarkTooltipContent } from "./tooltip-content-mark";

interface MarkEntriesManualCellParams extends MarkEntriesAndOutsDetailsRequired {
	collaborator: CollaboratorWithTurnParams;
	entryKey: EntryAndOutKey;
	date: Date;
	status: MarkStatusEnum;
	isExclude?: boolean;
	refetchGridValues: () => void;
}

export function MarkEntriesManualCell({
	value,
	idMark,
	justify,
	responsible,
	collaborator,
	entryKey,
	date,
	isExclude = false,
	status,
	refetchGridValues,
	// status,
}: MarkEntriesManualCellParams) {
	const { setContentAndOpen } = useContextSheetContentController();
	const defaultValues: MarkFormProps = {
		date: date ? date : new Date(),
		hour: value ?? "",
		justify,
		collaborator,
		entryKey,
	};
	return (
		<TooltipProvider delayDuration={0}>
			<Tooltip>
				<TooltipTrigger
					className="w-full h-full flex items-center justify-center text-yellow-600 cursor-pointer hover:underline"
					onDoubleClick={() =>
						setContentAndOpen({
							sheetMinWidth: "410px",
							Body: (
								<MarkSheetForm
									values={defaultValues}
									collaborator={collaborator}
									idMark={idMark}
									status={status}
									type="include"
									refetchGridValues={refetchGridValues}
								/>
							),
							Header: <MarkSheetFormHeader type="include" idMark={idMark} />,
						})
					}
				>
					{value}
				</TooltipTrigger>
				<MarkTooltipContent {...{ entryKey, justify, hour: value, responsible, isExclude }} />
			</Tooltip>
		</TooltipProvider>
	);
}
