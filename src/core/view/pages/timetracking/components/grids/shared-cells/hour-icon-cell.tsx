import type { MarkViewTimetrackingData } from "@/domain/entities/marks/mark-view-timetracking-data";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/view/components/ui/tooltip";
import { Clock3 } from "lucide-react";

export function TimetrackingGridHourIconCell({
	timeRanges = "",
	name = "",
}: MarkViewTimetrackingData["turn"]) {
	// function geEntryPairString() {
	// 	if (!entries) return [];
	// 	const entriesLength = Object.values(entries).length / 2;
	// 	return Array.from({ length: entriesLength }).map((_, index) => {
	// 		return `${entries[`entry${index + 1}`]} - ${entries[`out${index + 1}`]}`;
	// 	});
	// }
	// function turn() {
	// 	const turnDetails = geEntryPairString();
	// 	const length = turnDetails.length;

	// 	if (length === 0) return "";
	// 	if (length === 1) return turnDetails[0];
	// 	if (length === 2) return `${turnDetails[0]} e ${turnDetails[1]}`;

	// 	return `${turnDetails.slice(0, -1).join(", ")} e ${turnDetails[length - 1]}`;
	// }
	// function LayoutTurn() {
	// 	return (
	// 		<div className="w-full h-full">
	// 			<div className="font-semibold">{name}</div>
	// 			{timeRanges}
	// 		</div>
	// 	);
	// }
	return (
		<div className="w-full h-full flex items-center justify-center">
			<TooltipProvider delayDuration={0}>
				<Tooltip>
					<TooltipTrigger asChild>
						<Clock3 className="h-4 w-4" />
					</TooltipTrigger>
					<TooltipContent
						align="start"
						className="bg-black text-xs text-white dark:bg-white dark:text-black"
					>
						<div className="w-full h-full">
							<div className="font-semibold">{name}</div>
							{timeRanges}
						</div>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	);
}
