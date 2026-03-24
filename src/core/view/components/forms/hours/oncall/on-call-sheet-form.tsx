import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import { OnCallTypeEnum } from "@/domain/entities/on-call";
import type { TimeFormat } from "@/domain/entities/time";
import DateForm from "@/view/components/formfields/date-form-field";
import { GridForm } from "@/view/components/formfields/grid-from";
import { InputForm } from "@/view/components/formfields/input-form-field";
import { LabelForm } from "@/view/components/formfields/label-form";
import MultiSelectForm from "@/view/components/formfields/mult-select-form";
import SelectForm from "@/view/components/formfields/select-form";
import SelectStatusForm from "@/view/components/formfields/select-status-form";
import { TextAreaForm } from "@/view/components/formfields/text-area";
import { TimePickerForm } from "@/view/components/formfields/time-picker-form";
import { TimeRangePickerForm } from "@/view/components/formfields/time-range-picker-form";
import { SheetFooterSubmit } from "@/view/components/sheet/sheet-footer-submit";
import { Button } from "@/view/components/ui/button";
import { Separator } from "@/view/components/ui/separator";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { FormProvider } from "react-hook-form";
import useOnCallSheetForm from "./use-on-call-sheet-form";

export function OnCallSheetForm(params: SheetFormProps) {
	const {
		handleSubmit,
		form,
		onSubmit,
		isTypeAllDay,
		disableEndHour,
		invalidDates,
		disableFinalDate,
		initialTime,
		id,
		openModalExlcudeOnCall,
	} = useOnCallSheetForm(params);
	const grid = "col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2";
	const halfGrid = "col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1";
	const companyId = useSession().data?.user.companyId ?? "";
	function LeftChild() {
		return (
			<div className="flex gap-2">
				{id && (
					<Button
						variant="outline"
						size="icon"
						type="button"
						onClick={() => openModalExlcudeOnCall()}
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
		<FormProvider {...form}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				data-testid="form"
				className="h-full flex flex-col gap-4 px-1"
			>
				<ScrollArea className="h-full pb-32">
					<GridForm className="mt-0">
						<InputForm
							form={form}
							formFieldName="name"
							label="Nome"
							placeholder="Nome do sobreaviso"
							classNames={{
								formItem: grid,
							}}
							required
						/>
						<SelectForm
							form={form}
							datas={[
								{ value: OnCallTypeEnum.allDay, label: "Dia inteiro" },
								{ value: OnCallTypeEnum.period, label: "Período" },
							]}
							formFieldName="type"
							label="Tipo"
							placeholder="Selecione o tipo"
							classNames={{
								formItem: grid,
							}}
						/>
					</GridForm>
					{isTypeAllDay && (
						<GridForm gridCol="2" className={"mx-1 !important"}>
							<DateForm
								form={form}
								formFieldName="initialDate"
								label="Data"
								placeholder="00/00/0000"
								classNames={{
									formItem: halfGrid,
								}}
								required
							/>
							<TimeRangePickerForm
								form={form}
								startTimeKeyForm="initialTime"
								endTimeKeyForm="finalTime"
								label="Horário"
								classNames={{
									formItem: halfGrid,
								}}
								required
								description="description"
							/>
						</GridForm>
					)}
					{!isTypeAllDay && (
						<GridForm gridCol="2" className={"mx-1 !important"}>
							<DateForm
								form={form}
								formFieldName="initialDate"
								label="Data Inicial"
								placeholder="00/00/0000"
								classNames={{
									formItem: halfGrid,
								}}
								required
							/>
							<TimePickerForm
								form={form}
								formFieldName="initialTime"
								label="Horário Inicial"
								classNames={{ formItem: halfGrid }}
								required
							/>
							<DateForm
								form={form}
								formFieldName="finalDate"
								label="Data final"
								placeholder="00/00/0000"
								classNames={{
									formItem: halfGrid,
								}}
								disabled={disableFinalDate}
								invalidDates={(date) => invalidDates(date)}
								required
							/>
							<TimePickerForm
								form={form}
								formFieldName="finalTime"
								label="Horário final"
								minTime={initialTime as TimeFormat}
								classNames={{ formItem: halfGrid }}
								required
								disabled={disableEndHour}
							/>
						</GridForm>
					)}
					<GridForm className="mt-0 ">
						<TextAreaForm
							form={form}
							formFieldName="obs"
							label="Observação"
							placeholder="Digite a observação"
							classNames={{
								formItem: grid,
							}}
						/>
						<Separator className="col-span-2" />
						<LabelForm
							formFieldName=""
							label="Aplicar sobreaviso"
							classNameLabel="text-muted-foreground"
							description="description"
						/>
						<MultiSelectForm
							form={form}
							classNames={{ formItem: grid }}
							// options={departmentlist}
							endpoint={`department/findAllFiltered?status=ACTIVE&companyId=${companyId}`}
							label="Departamento"
							formFieldName="departmentIds"
							placeholder="Selecione o turno"
							variant="default"
							animation={2}
						/>
						<MultiSelectForm
							classNames={{ formItem: grid }}
							form={form}
							label="Turno"
							formFieldName="turnIds"
							// options={turnList}
							endpoint={`work-shift/findAllFiltered?status=ACTIVE&companyId=${companyId}`}
							placeholder="Selecione o turno"
							variant="default"
							animation={2}
						/>
						<MultiSelectForm
							classNames={{ formItem: grid }}
							form={form}
							label="Colaborador"
							endpoint="collaborator"
							formFieldName="collaboratorIds"
							// options={collaboratorlist}
							placeholder="Selecione o turno"
							variant="default"
							animation={2}
						/>
					</GridForm>
				</ScrollArea>
				<SheetFooterSubmit LeftChild={<LeftChild />} />
			</form>
		</FormProvider>
	);
}
