import type { ExportFields } from "@/domain/entities/exports/exports-fields";
import { Card } from "@/view/components/card/card";
import { ExportFieldCardContent } from "./export-field-card-content";
import { ExportFieldCardHeader } from "./export-field-card-header";

export interface ExportFieldCardParams {
	index: number;
	fieldParams: ExportFields;
}

export function ExportFieldCard(params: ExportFieldCardParams) {
	return (
		<Card
			classNames={{
				header: "bg-border/50",
			}}
			header={<ExportFieldCardHeader {...params} />}
		>
			<ExportFieldCardContent {...params} />
		</Card>
	);
}
