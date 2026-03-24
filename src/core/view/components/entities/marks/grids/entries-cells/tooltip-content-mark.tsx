import type { EntryAndOutKey } from "@/domain/entities/marks/marks";
import { getEntriesKey } from "@/domain/entities/time-tracking/get-entries-key";
import { TooltipContent } from "@/view/components/ui/tooltip";
export interface MarkTooltipContentParams {
	hour: string;
	justify: string;
	responsible: string;
	entryKey: EntryAndOutKey;
	isExclude?: boolean;
}
export function MarkTooltipContent({
	entryKey,
	hour,
	justify,
	responsible,
	isExclude = false,
}: MarkTooltipContentParams) {
	return (
		<TooltipContent
			className="w-[269px] flex flex-col gap-2 bg-black text-white dark:bg-white dark:text-black"
			align="start"
		>
			<div>
				<p className="font-semibold">Marcação {isExclude ? "desconsiderada" : "incluída"}:</p>
				<span>{`${hour} - ${getEntriesKey(entryKey)}`}</span>
			</div>
			<div>
				<p className="font-semibold">Justificativa:</p>
				<p>{justify}</p>
			</div>
			<div>
				<p className="font-semibold">Responsável:</p>
				<p>{responsible}</p>
			</div>
			<div>
				<span>Duplo clique para gerenciar</span>
			</div>
		</TooltipContent>
	);
}
