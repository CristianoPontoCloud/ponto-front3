import { useContextSheetContentController } from "@/application/providers/sheet-content/sheet-component-provider";
import type {
	DesconsiderMarkFormProps,
	MarkFormProps,
} from "@/domain/entities/marks/desconsider-marks";
import type { MarkType } from "@/domain/entities/marks/marks";

import {
	MarkSheetForm,
	MarkSheetFormHeader,
} from "@/view/components/forms/mark/mark/mark-sheet-form";
import { Tooltip, TooltipProvider, TooltipTrigger } from "@/view/components/ui/tooltip";
import { parse } from "date-fns";
import { MarkTooltipContent } from "./tooltip-content-mark";

interface MarkDesconsiderMarkCellParams {
	desconsiderMarks: DesconsiderMarkFormProps[];
	type: MarkType;
	collaborator: {
		id: string;
		name: string;
		position: string;
	};
	refetchGridValues: () => void;
}

interface TooltipDeconsiderMarkParams extends DesconsiderMarkFormProps {
	type: MarkType;
	collaborator: {
		id: string;
		name: string;
		position: string;
	};
	refetchGridValues: () => void;
}

function TooltipDeconsiderMark({
	date,
	collaborator,
	type,
	refetchGridValues,
	entryKey,
	hour,
	idMark,
	justify,
	responsible,
}: TooltipDeconsiderMarkParams) {
	const { setContentAndOpen } = useContextSheetContentController();

	const defaultValues: MarkFormProps = {
		collaborator,
		date: parse(date, "yyyy-MM-dd", new Date()),
		entryKey: "entry1",
		hour,
		justify,
	};
	return (
		<TooltipProvider delayDuration={0}>
			<Tooltip>
				<TooltipTrigger
					className="hover:underline"
					onDoubleClick={() =>
						setContentAndOpen({
							sheetMinWidth: "410px",
							Header: <MarkSheetFormHeader type={type} idMark={idMark} />,
							Body: (
								<MarkSheetForm
									values={defaultValues}
									collaborator={collaborator}
									idMark={idMark}
									type={type}
									refetchGridValues={refetchGridValues}
								/>
							),
						})
					}
				>
					{hour}
				</TooltipTrigger>
				<MarkTooltipContent {...{ entryKey, justify, hour, responsible, isExclude: true }} />
			</Tooltip>
		</TooltipProvider>
	);
}

function getSeparador(index: number, length: number): string {
	if (index === length - 2) return "e";
	if (index === length - 1) return "";
	return ",";
}

export function MarkDesconsiderMarkCell({
	desconsiderMarks,
	// dayMonth,
	type,
	collaborator,
	// entryKey,
	refetchGridValues,
}: MarkDesconsiderMarkCellParams) {
	// const { isTypeDaily, dailyDate } = useContextTimeTracking();
	// function initialDateCase() {
	// 	if (isTypeDaily) return dailyDate ?? new Date();
	// 	return new Date(dayMonth ?? "");
	// }
	return (
		<div className="flex gap-2">
			{desconsiderMarks.map(({ date, entryKey, hour, idMark, justify, responsible }, index) => {
				return (
					<>
						<TooltipDeconsiderMark
							date={date}
							type={type}
							collaborator={collaborator}
							entryKey={entryKey}
							hour={hour}
							idMark={idMark}
							justify={justify}
							responsible={responsible}
							key={index.toString()}
							refetchGridValues={refetchGridValues}
						/>
						{getSeparador(index, desconsiderMarks.length)}
					</>
				);
			})}
		</div>
	);
}
