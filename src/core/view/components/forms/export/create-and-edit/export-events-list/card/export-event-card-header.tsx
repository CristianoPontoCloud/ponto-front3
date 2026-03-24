import { Badge } from "@/view/components/ui/badge";
import { Button } from "@/view/components/ui/button";
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import { useContextExportFieldsAndEventsProvider } from "../../providers/export-fields-and-events-provider";
import type { ExportEventCardParams } from "./export-event-card";

export function ExportEventCardHeader({ eventParams: { name }, index }: ExportEventCardParams) {
	const { form, moveToDown, moveToUp, exclude } = useContextExportFieldsAndEventsProvider();
	const parsedNumber = (index + 1).toString();
	const cardNumber = parsedNumber.padStart(2, "0");
	const disabledMoveToUp = index === 0;
	const disabledMoveToDown = index + 1 === form.watch("fields").length;
	return (
		<div className="flex justify-between items-center">
			<div className="flex gap-2 items-center text-muted-foreground">
				<Badge className="bg-muted text-muted-foreground p-0 h-[20px] w-[38px] flex justify-center items-center">{`#${cardNumber}`}</Badge>
				<span>{name}</span>
			</div>
			<div className="flex gap-3 justify-center items-center">
				<Button
					type="button"
					size="sm"
					variant="ghost"
					className="p-0 w-[16px] h-[16px] hover:bg-transparent"
					disabled={disabledMoveToUp}
					onClick={() => moveToUp(index)}
				>
					<ArrowUp className="h-[9px] w-[9px]" />
				</Button>
				<Button
					type="button"
					size="sm"
					variant="ghost"
					className="p-0 w-[16px] h-[16px] hover:bg-transparent"
					disabled={disabledMoveToDown}
					onClick={() => moveToDown(index)}
				>
					<ArrowDown className="h-[9px] w-[9px]" />
				</Button>
				<Button
					type="button"
					size="sm"
					variant="ghost"
					className="p-0 w-[16px] h-[16px] text-destructive hover:text-destructive hover:bg-transparent"
					onClick={() => exclude(index)}
				>
					<Trash2 className="h-[9px] w-[9px]" />
				</Button>
			</div>
		</div>
	);
}
