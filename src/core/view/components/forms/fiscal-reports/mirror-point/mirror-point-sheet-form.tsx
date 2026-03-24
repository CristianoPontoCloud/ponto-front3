import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import { GridForm } from "@/view/components/formfields/grid-from";
import MonthPickerForm from "@/view/components/formfields/month-picker-form-field";
import MultiSelectForm from "@/view/components/formfields/mult-select-form";
import { SheetFooterSubmit } from "@/view/components/sheet/sheet-footer-submit";
import { fullSpanGenerate } from "@/view/lib/full-span-generate";
import { useMirrorPointSheetForm } from "./use-mirror-point-sheet-form";

export default function MirrorPointSheetForm(params: SheetFormProps) {
	const { form, onSubmit } = useMirrorPointSheetForm(params);

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
				<MonthPickerForm
					form={form}
					formFieldName="competence"
					label="Competência"
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
