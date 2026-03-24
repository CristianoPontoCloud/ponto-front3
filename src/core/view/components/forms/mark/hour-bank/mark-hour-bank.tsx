import { type MarkHourBankEntryBulkFormProps, MarkHourBankEntryTypeEnum } from "@/domain/entities/marks/settings/mark-hour-bank";
import { GridForm } from "@/view/components/formfields/grid-from";
import SelectTabsForm from "@/view/components/formfields/select-tabs-form";
import { TimePickerForm } from "@/view/components/formfields/time-picker-form";
import { SheetFooterSubmit } from "@/view/components/sheet/sheet-footer-submit";
import { Button } from "@/view/components/ui/button";
import { Form } from "@/view/components/ui/form";
import { ScrollArea } from "@/view/components/ui/scroll-area";
import { FolderClock, Plus, Trash2 } from "lucide-react";
import { tv } from "tailwind-variants";
import { MarkPerfilCollaborator } from "../perfil-collaborator";
import { useMarkHourBank } from "./use-mark-hour-bank";

export interface MarkRequestSheetFormParams {
	hasRecord?: boolean;
	collaborator: {
		id: string;
		name: string;
		position: string;
	};
	initialFormValues: MarkHourBankEntryBulkFormProps
}

export function MarkHourBankSheetFormHeader() {
	return (
		<div className="flex justify-start items-center gap-2">
			<FolderClock />
			Banco de horas
		</div>
	);
}

export function MarkHourBankSheetForm({
	collaborator,
	initialFormValues
}: MarkRequestSheetFormParams) {
	const { form, onSubmit, openModalUndoMark, fields, creatEntry, hasEntries, deleteEntry } = useMarkHourBank({ collaborator, initialFormValues });
	console.log(initialFormValues)
	const colSpanFull = "col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-2 !important";

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
						const separatorCase = fields.length > 1 && index + 1 < fields.length;
						const isDebit = form.watch(`entries.${index}.type`) === MarkHourBankEntryTypeEnum.DEBIT;
						const tabsTv = tv({
							base: colSpanFull,
							variants: {
								isDebit: {
									true: "text-destructive dark:text-red-600 hover:text-destructive",
									false: "text-lime-600 dark:text-green-600 hover:text-lime-600",
								},
							},
						});
						return (
							<GridForm key={field.id} className="m-0 p-1">
								<>
									{hasEntries && (
										<div className="col-span-2 flex justify-between items-center">
											<span className="text-muted-foreground">Ajuste {index + 1}</span>
											<Button
												type="button"
												variant="link"
												className="text-red-600"
												onClick={() => deleteEntry(field.id, index)}
											>
												Remover
											</Button>
										</div>
									)}
									<SelectTabsForm
										form={form}
										formFieldName={`entries.${index}.type`}
										options={[
											{ label: "Crédito", value: MarkHourBankEntryTypeEnum.CREDIT },
											{ label: "Débito", value: MarkHourBankEntryTypeEnum.DEBIT },
										]}
										classNames={{ formItem: colSpanFull }}
										disabled={!!field.id}
									/>
									<TimePickerForm
										form={form}
										formFieldName={`entries.${index}.minutes`}
										classNames={{ formItem: tabsTv({ isDebit }) }}
										disabled={!!field.id}
									/>
									{separatorCase && (
										<div className="w-full border-t-[1px] col-span-2 border-dashed border-boder my-4" />
									)}
								</>
							</GridForm>
						);
					})}
					{hasEntries && (
						<Button
							variant="outline"
							type="button"
							className="col-span-1 justify-self-end flex items-center gap-2 mt-4"
							onClick={() => creatEntry()}
						>
							<Plus />
							Adicionar
						</Button>
					)}
				</ScrollArea>
				<SheetFooterSubmit
					classNameToast="w-[335px] !important"
					LeftChild={
						hasEntries &&
						<Button
							variant="outline"
							className="text-destructive"
							size="icon"
							type="button"
							onClick={() => openModalUndoMark()}
						>
							<Trash2 className="text-red-600" />
						</Button>
					}
				/>
			</form>
		</Form>
	);
}
