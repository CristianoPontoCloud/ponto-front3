import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import type { MirrorPointFormProps } from "@/domain/entities/fiscal-reports/mirror-point";
import { toastCustom } from "@/view/components/toaster/toast-custom";
import { useFormContext } from "react-hook-form";

export function useMirrorPointSheetForm({ closeSheet }: SheetFormProps) {
	const form = useFormContext<MirrorPointFormProps>();

	function onSubmit() {
		toastCustom({
			Component: <>Gerando AFD</>,
		});
		closeSheet();
	}
	return { form, onSubmit };
}
