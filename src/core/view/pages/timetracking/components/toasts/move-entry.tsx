import type { EntryAndOutKey } from "@/domain/entities/marks/marks";
import { entriesEditToastMessage } from "@/view/components/forms/mark/entries-edit-toast-message";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";

interface TimetrackingMoveEntryToast {
	hour: string;
	entryKey: EntryAndOutKey;
	name: string;
	type: "left" | "right" | "previousDay" | "nextDay";
}

export function TimetrackingMoveEntryToast({
	hour,
	entryKey,
	name,
	type,
}: TimetrackingMoveEntryToast) {
	const iconStyle = "text-muted w-4 h-4";
	const arrowIcons = {
		left: <ArrowLeft className={iconStyle} />,
		right: <ArrowRight className={iconStyle} />,
		previousDay: <ArrowUp className={iconStyle} />,
		nextDay: <ArrowDown className={iconStyle} />,
	};
	const message = {
		left: "a esquerda",
		right: "a direita",
		previousDay: "o dia anterior",
		nextDay: "o próximo dia",
	};
	return (
		<>
			<div className="w-11 h-11 rounded-lg bg-muted-foreground flex justify-center items-center">
				{arrowIcons[type]}
			</div>
			<div>
				<p className="font-semibold">Marcação movida para {message[type]}</p>
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
