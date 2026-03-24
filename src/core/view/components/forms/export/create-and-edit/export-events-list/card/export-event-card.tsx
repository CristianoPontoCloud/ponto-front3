import type { ExportEvent } from "@/domain/entities/exports/exports-events";
import { Card } from "@/view/components/card/card";
import { ExportEventCardContent } from "./export-event-card-content";
import { ExportEventCardHeader } from "./export-event-card-header";

export interface ExportEventCardParams {
	index: number;
	eventParams: ExportEvent;
}

export function ExportEventCard(params: ExportEventCardParams) {
	return (
		<Card
			classNames={{
				header: "bg-border/50",
			}}
			header={<ExportEventCardHeader {...params} />}
		>
			<ExportEventCardContent {...params} />
		</Card>
	);
}
