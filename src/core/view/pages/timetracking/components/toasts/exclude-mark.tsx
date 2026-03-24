import type { EntryAndOutKey } from "@/domain/entities/marks/marks";
import { entriesEditToastMessage } from "@/view/components/forms/mark/entries-edit-toast-message";
import { AlarmClockPlus } from "lucide-react";

interface TimetrackingExcludeMarkToastParams {
	hour: string;
	entryKey: EntryAndOutKey;
	name: string;
}

export function TimetrackingExcludeMarkToast({
	hour,
	entryKey,
	name,
}: TimetrackingExcludeMarkToastParams) {
	return (
		<>
			<div className="w-11 h-11 rounded-lg bg-yellow-50 dark:bg-yellow-900/10 flex justify-center items-center">
				<AlarmClockPlus className="text-yellow-600 w-4 h-4" />
			</div>
			<div>
				<p className="font-semibold">Marcação desconsiderada!</p>
				<span className="text-muted-foreground truncate">
					{entriesEditToastMessage({
						hour,
						key: entryKey,
						name,
					})}
				</span>
			</div>
		</>
	);
}
