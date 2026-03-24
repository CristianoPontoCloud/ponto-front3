import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import DatePickerRangeForm from "@/view/components/formfields/date-picker-range-form-field";
import { GridForm } from "@/view/components/formfields/grid-from";
import MultiSelectForm from "@/view/components/formfields/mult-select-form";
import SelectForm from "@/view/components/formfields/select-form";
import { SheetFooterSubmit } from "@/view/components/sheet/sheet-footer-submit";
import { fullSpanGenerate } from "@/view/lib/full-span-generate";
import { useReceiptsMarkSheetForm } from "./use-receipts-mark-sheet-form";

export default function ReceiptsMarkSheetForm(params: SheetFormProps) {
	const { form, onSubmit } = useReceiptsMarkSheetForm(params);

	const fullspan = fullSpanGenerate();
	function endpointFiltered(endpoint: string) {
		return `${endpoint}/findAllFiltered?status=ACTIVE`;
	}
	return (
		<form
			onSubmit={(e) => {
				form.handleSubmit(onSubmit)(e);
			}}
			className="h-full flex flex-col justify-between px-1"
		>
			<GridForm>
				<DatePickerRangeForm
					form={form}
					label="Período"
					keyDateFrom="startDate"
					keyDateTo="endDate"
					placeholder="Data inicial - Data final"
					classNames={{
						formItem: fullspan,
					}}
					required
				/>
				<MultiSelectForm
					form={form}
					label="Colaboradores"
					formFieldName="collaborators"
					placeholder="Selecione um colaborador para filtrar"
					classNames={{
						formItem: fullspan,
					}}
					endpoint={endpointFiltered("collaborator")}
					required
				/>
				<SelectForm
					form={form}
					label="Formato"
					formFieldName="format"
					placeholder="Selecione um colaborador para filtrar"
					classNames={{
						formItem: fullspan,
					}}
					datas={[
						{
							label: "Padrão, um comprovante por folha",
							value: "Padrão, um comprovante por folha",
						},
					]}
				/>
			</GridForm>
			<SheetFooterSubmit onCancel={params.closeSheet} labelSubmit="Gerar" />
		</form>
	);
}
