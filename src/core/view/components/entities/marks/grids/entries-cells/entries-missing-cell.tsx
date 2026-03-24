import { useContextSheetContentController } from "@/application/providers/sheet-content/sheet-component-provider";
import type { MarkFormProps } from "@/domain/entities/marks/desconsider-marks";
import type { EntryAndOutKey, MarkEntriesAndOutsDetails } from "@/domain/entities/marks/marks";
import type { CollaboratorWithTurnParams } from "@/domain/entities/time-tracking/timetraking-collaborator";
import {
	MarkSheetForm,
	MarkSheetFormHeader,
} from "@/view/components/forms/mark/mark/mark-sheet-form";

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/view/components/ui/tooltip";

export interface MarkEntriesMissingCellParams extends MarkEntriesAndOutsDetails {
	collaborator: CollaboratorWithTurnParams;
	entryKey: EntryAndOutKey;
	refetchGridValues: () => void;
	date: Date;
}

export function MarkEntriesMissingCell({
	collaborator,
	value,
	entryKey,
	refetchGridValues,
	date,
}: MarkEntriesMissingCellParams) {
	const { setContentAndOpen } = useContextSheetContentController();
	const defaultValues: MarkFormProps = {
		date,
		hour: value ?? "",
		justify: "",
		collaborator,
		entryKey,
	};
	return (
		<TooltipProvider delayDuration={0}>
			<Tooltip>
				<TooltipTrigger
					className="w-full h-full flex items-center justify-center text-red-600 cursor-pointer hover:underline"
					onDoubleClick={() =>
						setContentAndOpen({
							sheetMinWidth: "410px",
							Header: <MarkSheetFormHeader type="include" />,
							Body: (
								<MarkSheetForm
									values={defaultValues}
									collaborator={collaborator}
									type="include"
									refetchGridValues={refetchGridValues}
								/>
							),
						})
					}
				>
					Falta
				</TooltipTrigger>
				<TooltipContent
					className="w-[149px] bg-black text-white dark:bg-white dark:text-black"
					align="start"
				>
					<p className="font-semibold">Marcação faltante</p>
					<span>Adicione a marcação manualmente com um duplo clique.</span>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
