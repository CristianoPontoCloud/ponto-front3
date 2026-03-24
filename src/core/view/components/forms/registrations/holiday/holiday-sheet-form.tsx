"use client";
import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import { CheckboxForm } from "@/view/components/formfields/checkbox-form";
import DateForm from "@/view/components/formfields/date-form-field";
import MultiSelectForm from "@/view/components/formfields/mult-select-form";
import SelectStatusForm from "@/view/components/formfields/select-status-form";
import { SheetFooterSubmit } from "@/view/components/sheet/sheet-footer-submit";
import { Button } from "@/view/components/ui/button";
import { Separator } from "@/view/components/ui/separator";
import { Trash } from "lucide-react";
import { InputForm } from "../../../formfields/input-form-field";
import { Form } from "../../../ui/form";
import { useHolidaySheetForm } from "./use-holiday-sheet-form";

export default function HolidaySheetForm(params: SheetFormProps) {
	const { form, handleSubmit, onSubmit, id, openModalExlcudeHoliday } = useHolidaySheetForm(params);
	function LeftChild() {
		return (
			<div className="flex gap-2">
				{id && (
					<Button
						variant="outline"
						size="icon"
						type="button"
						onClick={() => openModalExlcudeHoliday()}
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
						placeholder="Digite o nome do feriado"
						required
					/>
					<DateForm
						form={form}
						formFieldName="date"
						label="Data"
						placeholder="Selecione a data do feriado"
						required
					/>
					<CheckboxForm
						form={form}
						formFieldName="repeatHolidaysAllYears"
						label="Repetir feriado para todos os anos"
					/>
					<Separator />
					<span className="text-muted-foreground text-sm">Respeitar feriado</span>
					<MultiSelectForm
						endpoint="collaborator"
						form={form}
						formFieldName="collaboratorLinks"
						label="Colaboradores"
						placeholder="Selecione os colaboradores"
					/>
					<MultiSelectForm
						endpoint="department"
						form={form}
						formFieldName="departmentLinks"
						label="Departamentos"
						placeholder="Selecione os departamentos"
					/>
				</div>

				<SheetFooterSubmit onCancel={params.closeSheet} LeftChild={<LeftChild />} />
			</form>
		</Form>
	);
}
