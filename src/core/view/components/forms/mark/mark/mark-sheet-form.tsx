import type { MarkFormProps } from "@/domain/entities/marks/desconsider-marks";
import { MarkStatusEnum, type MarkType } from "@/domain/entities/marks/marks";
import { getEntriesKey } from "@/domain/entities/time-tracking/get-entries-key";
import DateForm from "@/view/components/formfields/date-form-field";
import { GridForm } from "@/view/components/formfields/grid-from";
import { TextAreaForm } from "@/view/components/formfields/text-area";
import { TimePickerForm } from "@/view/components/formfields/time-picker-form";
import { SheetFooterSubmit } from "@/view/components/sheet/sheet-footer-submit";
import { Button } from "@/view/components/ui/button";
import { Form } from "@/view/components/ui/form";
import { AlarmClockOff, AlarmClockPlus } from "lucide-react";
import { MarkPerfilCollaborator } from "../perfil-collaborator";
import { useMarkSheetForm } from "./use-mark-sheet-form";

export interface MarkSheetFormParams {
	idMark?: string;
	punchClockId?: string;
	values: MarkFormProps;
	collaborator: {
		id: string;
		name: string;
		position: string;
	};
	type: MarkType;
	status?: MarkStatusEnum;
	refetchGridValues: () => void;
}

interface MarkSheetFormHeaderParams {
	idMark?: string;
	type: MarkType;
}

export function MarkSheetFormHeader({ type, idMark }: MarkSheetFormHeaderParams) {
	const typeMap = {
		include: (
			<>
				<AlarmClockPlus className="w-6 h-6" /> {idMark ? "Marcação incluída" : "Incluir marcação"}
			</>
		),
		reconsider: (
			<>
				<AlarmClockPlus className="w-6 h-6" /> Reconsiderar marcação
			</>
		),
		disconsider: (
			<>
				<AlarmClockOff className="w-6 h-6" /> Desconsiderar marcação
			</>
		),
		exclude: (
			<>
				<AlarmClockOff className="w-6 h-6" /> Marcação desconsiderada
			</>
		),
	};

	const header = typeMap[type];

	return <div className="flex justify-start items-center gap-2">{header}</div>;
}

export function MarkSheetForm({
	values,
	collaborator,
	idMark,
	type,
	refetchGridValues,
	status,
}: MarkSheetFormParams) {
	const { form, handleSubmit, onSubmit, openModalUndoMark } = useMarkSheetForm({
		values,
		idMark,
		type,
		refetchGridValues,
		status,
	});
	const colSpanFull = "col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-2";
	const disconsiderDisable = type === "disconsider" || type === "exclude";
	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" autoComplete="off">
				<MarkPerfilCollaborator {...collaborator} />
				<GridForm gridCol="2" className="my-0">
					<DateForm
						form={form}
						formFieldName="date"
						label="Data"
						classNames={{ formItem: colSpanFull }}
						disabled
					/>
					<TimePickerForm
						form={form}
						formFieldName="hour"
						label={`Horário - ${getEntriesKey(values.entryKey)}`}
						classNames={{ formItem: colSpanFull }}
						disabled={disconsiderDisable}
						required
					/>
					<div className="w-full border-t-[1px] border-dashed border-boder col-span-2" />
					<TextAreaForm
						form={form}
						classNames={{ formItem: colSpanFull }}
						formFieldName="justify"
						label="Justificativa"
						placeholder="Informe uma justificativa"
						required
						max={200}
						autoComplete="off"
					/>
					<span className={`text-muted-foreground ${colSpanFull}`}>Mínimo de 10 caracteres.</span>
					<span className={`text-muted-foreground ${colSpanFull}`}>Máximo de 200 caracteres.</span>
				</GridForm>
				<SheetFooterSubmit
					classNameToast="w-[335px] !important"
					errorsMap={[
						{ key: "justify", message: "Incluir justificativa" },
						{ key: "date", message: "Incluir data" },
					]}
					LeftChild={
						idMark ? (
							<Button
								variant="link"
								className="text-destructive p-0 dark:text-red-600"
								type="button"
								onClick={() => openModalUndoMark()}
							>
								{`${status === MarkStatusEnum.normal ? "Desfazer" : "Excluir"} inclusão`}
							</Button>
						) : null
					}
				/>
			</form>
		</Form>
	);
}
