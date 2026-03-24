import type { CollaboratorEditTurnFormProps } from "@/domain/entities/collaborator/collaborator-edit-turn";
import {
	MarkTurnEditTypeDateChangeEnum
} from "@/domain/entities/marks/settings/mark-edit-turn";
import DateForm from "@/view/components/formfields/date-form-field";
import SelectForm from "@/view/components/formfields/select-form";
import { SelectTabs } from "@/view/components/select-tabs/select-tabs";
import { SheetFooterSubmit } from "@/view/components/sheet/sheet-footer-submit";
import { Button } from "@/view/components/ui/button";
import { Form } from "@/view/components/ui/form";
import { AlarmClockPlus, Trash2 } from "lucide-react";
import { MarkPerfilCollaborator } from "../perfil-collaborator";
import { useMarkTurnEdit } from "./use-mark-turn-edit";

export interface MarkTurnEditSheetFormParams {
	hasRecord?: boolean;
	values: CollaboratorEditTurnFormProps;
	collaborator: {
		id: string;
		name: string;
		position: string;
	};
}

export function MarkTurnEditSheetFormHeader() {
	return (
		<div className="flex justify-start items-center gap-2">
			<AlarmClockPlus />
			Alteração de turno
		</div>
	);
}

export function MarkTurnEditSheetForm({
	collaborator,
	values,
	hasRecord,
}: MarkTurnEditSheetFormParams) {
	const { form, onSubmit, openModalUndoMark, setTurnEditType, turnEditType } = useMarkTurnEdit({
		collaborator,
		values,
		hasRecord,
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-4"
				autoComplete="off"
			>
				<MarkPerfilCollaborator {...collaborator} />
				<SelectForm
					form={form}
					formFieldName="turnId"
					endpoint="work-shift/findAllFiltered?status=ACTIVE"
					required
					label="Turno"
					placeholder="Selecione o turno"
				/>
				<SelectTabs options={[
					{ value: MarkTurnEditTypeDateChangeEnum.specificDays, label: "Dia especifico" },
					{
						value: MarkTurnEditTypeDateChangeEnum.startingFromDay,
						label: "A partir de um dia",
					},
				]}
					value={turnEditType}
					onValueChange={(value) => setTurnEditType(value as MarkTurnEditTypeDateChangeEnum)}
				/>

				<DateForm form={form} formFieldName="startDate" label="Selecione a data" />
				<SheetFooterSubmit
					classNameToast="w-[335px] !important"
					LeftChild={
						hasRecord ? (
							<Button
								variant="outline"
								className="text-destructive"
								size="icon"
								type="button"
								onClick={() => openModalUndoMark()}
							>
								<Trash2 className="text-red-600" />
							</Button>
						) : null
					}
				/>
			</form>
		</Form>
	);
}
