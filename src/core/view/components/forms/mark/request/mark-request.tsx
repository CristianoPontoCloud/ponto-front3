import {
	MarkRequestTypeEnum,
	MarkRequestsMap,
} from "@/domain/entities/marks/settings/mark-requests";
import DateForm from "@/view/components/formfields/date-form-field";
import { GridForm } from "@/view/components/formfields/grid-from";
import SelectForm from "@/view/components/formfields/select-form";
import { TextAreaForm } from "@/view/components/formfields/text-area";
import { TimePickerForm } from "@/view/components/formfields/time-picker-form";
import { SheetFooterSubmit } from "@/view/components/sheet/sheet-footer-submit";
import { Button } from "@/view/components/ui/button";
import { Form } from "@/view/components/ui/form";
import { ScrollArea } from "@/view/components/ui/scroll-area";
import { Plus, ShieldCheck, Trash2 } from "lucide-react";
import { MarkPerfilCollaborator } from "../perfil-collaborator";
import { useMarkRequest } from "./use-mark-request";

export interface MarkRequestSheetFormParams {
	hasRecord?: boolean;
	date: Date;
	collaborator: {
		id: string;
		name: string;
		position: string;
	};
}

export function MarkRequestSheetFormHeader() {
	return (
		<div className="flex justify-start items-center gap-2">
			<ShieldCheck />
			Solicitação
		</div>
	);
}

export function MarkRequestSheetForm({
	collaborator,
	hasRecord,
	date,
}: MarkRequestSheetFormParams) {
	const { form, onSubmit, openModalUndoMark, fields, remove, createRequest } = useMarkRequest({
		collaborator,
		hasRecord,
		date,
	});
	const colSpanFull = "col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-2";
	const halfSpanFull = "col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1";

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col h-full gap-4"
				autoComplete="off"
			>
				<MarkPerfilCollaborator {...collaborator} />
				<ScrollArea
					className="w-full max-h-[75%] sm:max-h-[78%] md:max-h-[80%] lg:max-h-[80%] xl:max-h-[70%] 2xl:max-h-[80%]"
					type="always"
				>
					{fields.map((field, index) => {
						const watchType = form.watch(`requests.${index}.type`) as MarkRequestTypeEnum;
						const separatorCase = fields.length > 1 && index + 1 < fields.length;
						const dynamicFields = {
							[MarkRequestTypeEnum.emergency]: (
								<>
									<DateForm
										form={form}
										formFieldName={`requests.${index}.date`}
										classNames={{ formItem: halfSpanFull }}
										label="Data"
										placeholder="Selecione a data"
									/>
									<TimePickerForm
										form={form}
										formFieldName={`requests.${index}.hour`}
										classNames={{ formItem: halfSpanFull }}
										label="Hora"
										placeholder="Selecione a hora"
									/>
								</>
							),
							[MarkRequestTypeEnum.doctor]: (
								<>
									<DateForm
										form={form}
										formFieldName={`requests.${index}.dtStart`}
										classNames={{ formItem: halfSpanFull }}
										label="Data inicial"
										placeholder="Selecione a data inicial"
									/>
									<TimePickerForm
										form={form}
										formFieldName={`requests.${index}.hrStart`}
										classNames={{ formItem: halfSpanFull }}
										label="Hora inicial"
										placeholder="Selecione a hora inicial"
									/>
									<DateForm
										form={form}
										formFieldName={`requests.${index}.dtEnd`}
										classNames={{ formItem: halfSpanFull }}
										label="Data final"
										placeholder="Selecione a data final"
									/>
									<TimePickerForm
										form={form}
										formFieldName={`requests.${index}.hrEnd`}
										classNames={{ formItem: halfSpanFull }}
										label="Hora final"
										placeholder="Selecione a hora final"
									/>
								</>
							),
						};
						return (
							<GridForm key={field.id} className="m-0 p-1">
								<>
									{hasRecord && (
										<div className="col-span-2 flex justify-between items-center">
											<span className="text-muted-foreground">Solicitação {index + 1}</span>
											<Button
												type="button"
												variant="link"
												className="text-red-600"
												onClick={() => remove(index)}
											>
												Remover
											</Button>
										</div>
									)}
									<SelectForm
										form={form}
										formFieldName={`requests.${index}.type`}
										datas={MarkRequestsMap}
										label="Solicitação"
										classNames={{ formItem: colSpanFull }}
										required
									/>
									{dynamicFields[watchType]}
									<TextAreaForm
										form={form}
										formFieldName={`requests.${index}.justify`}
										label="justificativa"
										placeholder="Digite uma justificativa"
										classNames={{ formItem: colSpanFull }}
										required
									/>

									{separatorCase && (
										<div className="w-full border-t-[1px] col-span-2 border-dashed border-boder my-4" />
									)}
								</>
							</GridForm>
						);
					})}
					{hasRecord && (
						<Button
							variant="outline"
							type="button"
							className="col-span-1 justify-self-end flex items-center gap-2 mt-4"
							onClick={() => createRequest()}
						>
							<Plus />
							Adicionar
						</Button>
					)}
				</ScrollArea>
				<SheetFooterSubmit
					errorsMap={[
						{ key: "justify", message: "Informe uma justificativa" },
						{ key: "request", message: "Informe uma solicitação" },
						{ key: "hrStart", message: "Informe uma hora inicial" },
						{ key: "hrEnd", message: "Informe uma hora final" },
						{ key: "hour", message: "Informe a hora" },
					]}
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
