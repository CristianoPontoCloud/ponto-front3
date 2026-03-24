import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import type { ReceiptsMarkFormProps } from "@/domain/entities/fiscal-reports/receipts-marks";
import { toastCustom } from "@/view/components/toaster/toast-custom";
import { useFormContext } from "react-hook-form";

export function useReceiptsMarkSheetForm({ closeSheet }: SheetFormProps) {
	const form = useFormContext<ReceiptsMarkFormProps>();

	function onSubmit() {
		toastCustom({
			Component: <>Gerando AFD</>,
		});
		closeSheet();
	}
	return { form, onSubmit };
}
