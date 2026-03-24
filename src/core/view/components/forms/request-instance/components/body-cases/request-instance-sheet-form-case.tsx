import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import { RequestInstanceAceptedOrRejectButtons } from "../shared/request-instance-acepted-or-reject-buttons";
import { RequestInstanceViewerSheetForm } from "../shared/request-instance-viewer-sheet-form";
import { RequestInstanceBodyLayoutSheetForm } from "./request-instance-body-layout-sheet-form";

export function RequestInstanceSheetFormCase({ closeSheet }: SheetFormProps) {
	return (
		<RequestInstanceBodyLayoutSheetForm>
			<RequestInstanceViewerSheetForm />
			<RequestInstanceAceptedOrRejectButtons closeSheet={closeSheet} />
		</RequestInstanceBodyLayoutSheetForm>
	);
}
