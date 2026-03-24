import type { MarkFieldsUserPreferenceFormProp } from "@/domain/entities/marks/fields-user-preferences";
import { CheckboxForm } from "@/view/components/formfields/checkbox-form";
import { GridForm } from "@/view/components/formfields/grid-from";
import { SheetFooterSubmit } from "@/view/components/sheet/sheet-footer-submit";
import { Button } from "@/view/components/ui/button";
import { Form } from "@/view/components/ui/form";
import { Columns3 } from "lucide-react";
import { useMarkFieldsUserPreferenceSheetForm } from "./use-timetracking-fields-user-preference";

export interface MarkFieldsUserPreferenceSheetFormParams {
	values?: MarkFieldsUserPreferenceFormProp;
}

export function MarkFieldsUserPreferenceSheetFormHeader() {
	return (
		<div className="flex justify-start items-center gap-2">
			<Columns3 />
			Personalizar colunas
		</div>
	);
}

export function MarkFieldsUserPreferenceSheetForm({
	values,
}: MarkFieldsUserPreferenceSheetFormParams) {
	const { form, handleSubmit, onSubmit, redfine } = useMarkFieldsUserPreferenceSheetForm({
		values,
	});
	const colSpanFull = "col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-2";

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" autoComplete="off">
				<GridForm gridCol="2" className="my-0">
					<span className="text-muted-foreground">Horas normais</span>
					<CheckboxForm
						form={form}
						formFieldName="hrDaytime"
						label="Diurnas normais"
						classNameFormItem={colSpanFull}
					/>
					<CheckboxForm
						form={form}
						formFieldName="hrTotalDaytime"
						label="Total normais"
						classNameFormItem={colSpanFull}
					/>
					<CheckboxForm
						form={form}
						formFieldName="hrTotalWorked"
						label="Total trabalhado"
						classNameFormItem={colSpanFull}
					/>
					<CheckboxForm
						form={form}
						formFieldName="hrExpectedHours"
						label="Horas previstas"
						classNameFormItem={colSpanFull}
					/>
					<CheckboxForm
						form={form}
						formFieldName="hrNight"
						label="Noturnas normais"
						classNameFormItem={colSpanFull}
					/>
					<CheckboxForm
						form={form}
						formFieldName="hrTotalNight"
						label="Total noturno"
						classNameFormItem={colSpanFull}
					/>
					<CheckboxForm
						form={form}
						formFieldName="hrInterval"
						label="Intervalo"
						classNameFormItem={colSpanFull}
					/>
					<div className="w-full border-t-[1px] border-dashed border-boder col-span-2" />
					<span className="text-muted-foreground">Faltas e atraso</span>
					<CheckboxForm
						form={form}
						formFieldName="hrEarlyOut"
						label="Saída antecipada"
						classNameFormItem={colSpanFull}
					/>
					<CheckboxForm
						form={form}
						formFieldName="hrMissings"
						label="Horas falta"
						classNameFormItem={colSpanFull}
					/>
					<CheckboxForm
						form={form}
						formFieldName="hrDelay"
						label="Horas atraso"
						classNameFormItem={colSpanFull}
					/>
					<CheckboxForm
						form={form}
						formFieldName="hrDaytimeDelayInterval"
						label="Horas atraso diurna"
						classNameFormItem={colSpanFull}
					/>
					<CheckboxForm
						form={form}
						formFieldName="hrNightDelayTotal"
						label="Horas atraso noturna"
						classNameFormItem={colSpanFull}
					/>
					<CheckboxForm
						form={form}
						formFieldName="hrDelayTotal"
						label="Horas atraso noturna"
						classNameFormItem={colSpanFull}
					/>
					<div className="w-full border-t-[1px] border-dashed border-boder col-span-2" />
					<span className="text-muted-foreground">Horas extra</span>
					<CheckboxForm
						form={form}
						formFieldName="hrEarlyEntry"
						label="Entrada antecipada"
						classNameFormItem={colSpanFull}
					/>
					<CheckboxForm
						form={form}
						formFieldName="hrTotalExtraDaytime"
						label="Total extra diurna"
						classNameFormItem={colSpanFull}
					/>
					<CheckboxForm
						form={form}
						formFieldName="hrTotalExtraNight"
						label="Total extra noturna"
						classNameFormItem={colSpanFull}
					/>
					<CheckboxForm
						form={form}
						formFieldName="hrTotalExtra"
						label="Total extra "
						classNameFormItem={colSpanFull}
					/>
				</GridForm>
				<SheetFooterSubmit
					LeftChild={
						<Button variant="link" className="text-primary" type="button" onClick={() => redfine()}>
							Redefinir
						</Button>
					}
				/>
			</form>
		</Form>
	);
}
