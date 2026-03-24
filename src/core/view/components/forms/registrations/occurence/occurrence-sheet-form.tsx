import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import { occurrenceFieldMap } from "@/domain/entities/occurrence";
import { CheckboxForm } from "@/view/components/formfields/checkbox-form";
import SelectForm from "@/view/components/formfields/select-form";
import SelectStatusForm from "@/view/components/formfields/select-status-form";
import { SheetFooterSubmit } from "@/view/components/sheet/sheet-footer-submit";
import { Button } from "@/view/components/ui/button";
import { Trash } from "lucide-react";
import { InputForm } from "../../../formfields/input-form-field";
import { Form } from "../../../ui/form";
import { useOccurrenceSheetForm } from "./use-occurrence-sheet-form";

export default function OccurrenceSheetForm(params: SheetFormProps) {
	const { form, handleSubmit, onSubmit, id, openModalExlcudeOccurrence } =
		useOccurrenceSheetForm(params);
	function LeftChild() {
		return (
			<div className="flex gap-2">
				{id && (
					<Button
						variant="outline"
						size="icon"
						type="button"
						onClick={() => openModalExlcudeOccurrence()}
					>
						<Trash className="text-red-500" />
					</Button>
				)}
				<SelectStatusForm
					formFieldName="status"
					form={form}
					classNames={{
						formItem: "w-fit",
					}}
				/>
			</div>
		);
	}
	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col justify-between px-1">
				<div className="flex flex-col gap-4">
					<InputForm
						form={form}
						formFieldName="name"
						label="Nome"
						placeholder="Digite o nome da ocorrência"
						required
					/>
					<SelectForm
						form={form}
						formFieldName="field"
						label="Campo"
						placeholder="Selecione o campo"
						required
						datas={occurrenceFieldMap}
					/>
					<CheckboxForm
						form={form}
						formFieldName="controllerOccurrence"
						label="Controlar ocorrência"
					/>
					<InputForm
						form={form}
						formFieldName="considerFrom"
						label="Considerar à partir de (Minutos)"
						required
						placeholder="0"
						min={0}
						onlyNumbers
					/>
				</div>
				<SheetFooterSubmit onCancel={params.closeSheet} LeftChild={<LeftChild />} />
			</form>
		</Form>
	);
}
