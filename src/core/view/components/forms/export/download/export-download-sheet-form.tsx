import { exportDownloadSchema } from "@/application/validation/forms/exports/export-schema";
import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import type { ExportDownloadFormProps } from "@/domain/entities/exports/exports";
import DatePickerRangeForm from "@/view/components/formfields/date-picker-range-form-field";
import MultiSelectForm from "@/view/components/formfields/mult-select-form";
import { DownloadFileToast } from "@/view/components/reutilities-toasts/download-file-toast";
import { SheetFooterSubmit } from "@/view/components/sheet/sheet-footer-submit";
import { toastCustom } from "@/view/components/toaster/toast-custom";
import { exportDownloadInitialFormValues } from "@/view/pages/exports/export-initial-values";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

export function ExportDownloadSheetForm({ closeSheet }: SheetFormProps) {
	const form = useForm<ExportDownloadFormProps>({
		values: exportDownloadInitialFormValues,
		resolver: zodResolver(exportDownloadSchema),
		mode: "onSubmit",
	});
	// async function onSubmit(data: ExportDownloadFormProps) {
	async function onSubmit() {
		toastCustom({
			Component: (
				<DownloadFileToast
					fileName="Folha de pagamento"
					loadFile={(setLink) => {
						setLink("teste");
					}}
				/>
			),
		});
		closeSheet();
	}
	return (
		<FormProvider {...form}>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit(onSubmit)(e);
				}}
				data-testid="form"
				className="flex flex-col h-full gap-4"
			>
				<DatePickerRangeForm
					form={form}
					keyDateFrom="dateFrom"
					keyDateTo="dateTo"
					label="Período"
					required
				/>
				<MultiSelectForm
					form={form}
					formFieldName="turnIds"
					options={[{ label: "teste", value: "teste" }]}
					// endpoint="workshift"
					label="Turnos"
					placeholder="Selecione um turno para filtrar"
				/>
				<MultiSelectForm
					form={form}
					formFieldName="departmentIds"
					options={[{ label: "teste", value: "teste" }]}
					// endpoint="department"
					label="Departamentos"
					placeholder="Selecione um departamento para filtrar"
				/>
				<MultiSelectForm
					form={form}
					formFieldName="positionIds"
					options={[{ label: "teste", value: "teste" }]}
					// endpoint="position"
					label="Cargos"
					placeholder="Selecione um cargo para filtrar"
				/>
				<MultiSelectForm
					form={form}
					formFieldName="costCenterIds"
					options={[{ label: "teste", value: "teste" }]}
					// endpoint="cost-center"
					label="Centro de custos"
					placeholder="Selecione um centro de custo para filtrar"
				/>
				<MultiSelectForm
					form={form}
					formFieldName="collaboratorIds"
					options={[{ label: "teste", value: "teste" }]}
					label="Colaboradores"
					placeholder="Selecione um colaborador para filtrar"
					required
				/>
				<SheetFooterSubmit labelSubmit="Exportar" />
			</form>
		</FormProvider>
	);
}
