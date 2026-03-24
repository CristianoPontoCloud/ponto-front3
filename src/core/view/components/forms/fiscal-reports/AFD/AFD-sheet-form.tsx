import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import DatePickerRangeForm from "@/view/components/formfields/date-picker-range-form-field";
import { GridForm } from "@/view/components/formfields/grid-from";
import MultiSelectForm from "@/view/components/formfields/mult-select-form";
import { SheetFooterSubmit } from "@/view/components/sheet/sheet-footer-submit";
import { fullSpanGenerate } from "@/view/lib/full-span-generate";
import { useAFDSheetForm } from "./use-AFD-sheet-form";

export default function AFDSheetForm(params: SheetFormProps) {
	const { form, onSubmit } = useAFDSheetForm(params);
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
					keyDateFrom="periodStart"
					keyDateTo="periodEnd"
					label="Período"
					placeholder="Data inicial - Data final"
					classNames={{
						formItem: fullspan,
					}}
					required
				/>
				<MultiSelectForm
					form={form}
					label="Turnos"
					formFieldName="turns"
					placeholder="Selecione um turno para filtrar"
					classNames={{
						formItem: fullspan,
					}}
					endpoint={endpointFiltered("work-shift")}
				/>
				<MultiSelectForm
					form={form}
					label="Departamentos"
					formFieldName="departments"
					placeholder="Selecione um departamento para filtrar"
					classNames={{
						formItem: fullspan,
					}}
					endpoint={endpointFiltered("department")}
				/>
				<MultiSelectForm
					form={form}
					label="Cargos"
					formFieldName="positions"
					placeholder="Selecione um cargo para filtrar"
					classNames={{
						formItem: fullspan,
					}}
					endpoint={endpointFiltered("position")}
				/>
				<MultiSelectForm
					form={form}
					label="Centro de custo"
					formFieldName="costcenters"
					placeholder="Selecione um cargo para filtrar"
					classNames={{
						formItem: fullspan,
					}}
					endpoint={endpointFiltered("position")}
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
			</GridForm>
			<SheetFooterSubmit onCancel={params.closeSheet} labelSubmit="Gerar" />
		</form>
	);
}
