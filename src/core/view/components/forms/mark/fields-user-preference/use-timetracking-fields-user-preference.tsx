import { useContextSheetContentController } from "@/application/providers/sheet-content/sheet-component-provider";
import type { MarkFieldsUserPreferenceFormProp } from "@/domain/entities/marks/fields-user-preferences";
import { dateSubmited } from "@/view/components/toaster/date-submited";
import { toastController } from "@/view/components/toaster/toast-controller";
import { Columns3 } from "lucide-react";
import { useForm } from "react-hook-form";

interface UseMarkFieldsUserPreferenceSheetFormParams {
	values?: MarkFieldsUserPreferenceFormProp;
}
const defautlValues: MarkFieldsUserPreferenceFormProp = {
	hrDaytime: true,
	hrDaytimeDelayInterval: true,
	hrDelay: true,
	hrDelayTotal: true,
	hrEarlyEntry: true,
	hrEarlyOut: true,
	hrExpectedHours: true,
	hrInterval: true,
	hrMissings: true,
	hrNight: true,
	hrNightDelayTotal: true,
	hrTotalDaytime: true,
	hrTotalExtra: true,
	hrTotalNight: true,
	hrTotalWorked: true,
	hrTotalExtraDaytime: true,
	hrTotalExtraNight: true,
};

export function useMarkFieldsUserPreferenceSheetForm({
	values,
}: UseMarkFieldsUserPreferenceSheetFormParams) {
	const { reset } = useContextSheetContentController();
	const form = useForm<MarkFieldsUserPreferenceFormProp>({
		values: values ?? defautlValues,
		mode: "onSubmit",
	});

	const { handleSubmit } = form;

	function Icon() {
		return (
			<>
				<div className="w-11 h-11 rounded-lg bg-primary/10 flex justify-center items-center">
					<Columns3 className="text-primary w-4 h-4" />
				</div>
				<div>
					<p className="font-semibold">Colunas salvas!</p>
					<span className="text-muted-foreground truncate">{dateSubmited()}</span>
				</div>
			</>
		);
	}

	function onSubmit(data: MarkFieldsUserPreferenceFormProp) {
		reset();
		toastController.custom({
			Component: <Icon />,
		});
		console.log("Dados enviados:", data);
	}

	function redfine() {
		const fieldsKeys = Object.keys(defautlValues);
		for (const key of fieldsKeys) {
			form.setValue(key as keyof MarkFieldsUserPreferenceFormProp, true);
			form.trigger(key as keyof MarkFieldsUserPreferenceFormProp);
		}
	}

	return {
		form,
		handleSubmit,
		onSubmit,
		redfine,
	};
}
