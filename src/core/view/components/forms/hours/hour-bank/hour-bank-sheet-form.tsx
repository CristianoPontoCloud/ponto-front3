import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import { CheckboxForm } from "@/view/components/formfields/checkbox-form";
import DateForm from "@/view/components/formfields/date-form-field";
import { GridForm } from "@/view/components/formfields/grid-from";
import { InputForm } from "@/view/components/formfields/input-form-field";
import SelectStatusForm from "@/view/components/formfields/select-status-form";
import { SheetFooterSubmit } from "@/view/components/sheet/sheet-footer-submit";
import { Button } from "@/view/components/ui/button";
import { Separator } from "@/view/components/ui/separator";
import { addDays } from "date-fns";
import { Trash } from "lucide-react";
import { FormProvider } from "react-hook-form";
import useHourBankSheetForm from "./use-hour-bank-sheet-form";

export function HourBankSheetForm(params: SheetFormProps) {
	const { handleSubmit, methods, onSubmit, id, openModalExlcudeHourBank } =
		useHourBankSheetForm(params);

	function LeftChild() {
		return (
			<div className="flex gap-2">
				{id && (
					<Button
						variant="outline"
						size="icon"
						type="button"
						onClick={() => openModalExlcudeHourBank()}
					>
						<Trash className="text-red-500" />
					</Button>
				)}
				<SelectStatusForm
					formFieldName="status"
					form={methods}
					classNames={{
						formItem: "w-fit",
					}}
				/>
			</div>
		);
	}
	const grid = "col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2";
	const startDate = methods.watch("startDate");
	const startDateIsNull = startDate === null;
	function endDateValidDates(date: Date): boolean {
		const minDate = addDays(date, 1);
		return minDate <= (startDate ?? new Date());
	}
	return (
		<FormProvider {...methods}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				data-testid="form"
				className="h-full flex flex-col gap-4 px-1"
			>
				<GridForm className="mt-0">
					<InputForm
						form={methods}
						formFieldName="name"
						label="Nome"
						placeholder="Digite o nome do banco de horas"
						classNames={{
							formItem: grid,
						}}
						required
					/>
					<DateForm
						form={methods}
						formFieldName="startDate"
						label="Data inicial"
						placeholder="00/00/0000"
						invalidDates={(date) => date >= new Date()}
						classNames={{
							formItem: grid,
						}}
						required
					/>
					<DateForm
						form={methods}
						formFieldName="endDate"
						label="Data final"
						placeholder="00/00/0000"
						invalidDates={(date) => endDateValidDates(date)}
						classNames={{
							formItem: grid,
						}}
						disabled={startDateIsNull}
						required
					/>
					<InputForm
						form={methods}
						formFieldName="resetDBEveryXMonths"
						label="Zerar banco a cada (Meses)"
						placeholder="Digite o período"
						onlyNumbers
						classNames={{
							formItem: grid,
						}}
						required
					/>
					<Separator orientation="horizontal" className={grid} />
					<CheckboxForm
						form={methods}
						formFieldName="discountAbsences"
						label="Desconto falta"
						classNameFormItem={grid}
					/>
					<CheckboxForm
						form={methods}
						formFieldName="discountLateArrivals"
						label="Desconto atraso"
						classNameFormItem={grid}
					/>
					<CheckboxForm
						form={methods}
						formFieldName="discountEarlyDeparture"
						label="Desconto saída antecipada"
						classNameFormItem={grid}
					/>
				</GridForm>

				<SheetFooterSubmit LeftChild={<LeftChild />} />
			</form>
		</FormProvider>
	);
}
