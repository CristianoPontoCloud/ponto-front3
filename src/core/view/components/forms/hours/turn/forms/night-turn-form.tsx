import { useTopOffset } from "@/application/hooks/use-top-off-set";
import { useSysConfigStore } from "@/application/providers/sys-config/use-sys-config";
import { sysConfigEnumAdapters } from "@/application/usecases/sys-config-paramters-maper";
import type { TurnFormProps } from "@/domain/entities/turns/turns";
import { GridForm } from "@/view/components/formfields/grid-from";
import SelectForm from "@/view/components/formfields/select-form";
import { TimePickerForm } from "@/view/components/formfields/time-picker-form";
import { TimePickerWithSecondsForm } from "@/view/components/formfields/time-picker-with-seconds-form";
import { ScrollArea } from "@/view/components/ui/scroll-area";
import { useRef } from "react";
import { useFormContext } from "react-hook-form";

export function NightTurnForm() {
	const form = useFormContext<TurnFormProps>();
	const { parameters } = useSysConfigStore();
	const ref = useRef<HTMLDivElement>(null);
	const height = useTopOffset(ref);
	return (
		<ScrollArea
			className="w-full p-1"
			data-testid="form-dsr"
			ref={ref}
			style={{ height: height - 60 }}
		>
			<GridForm className="w-full mt-0" gridCol="3">
				<TimePickerForm
					form={form}
					formFieldName="nightlyShiftStartTimeCode"
					label="Início horário noturno"
					placeholder="Digite o nome do turno"
					classNames={{
						formItem: "col-span-3 sm:col-span-3 md:col-span-1 lg:col-span-1 xl:col-span-1",
					}}
					description="description"
				/>
				<TimePickerForm
					form={form}
					formFieldName="nightlyShiftEndTimeCode"
					label="Término horário noturno"
					placeholder="Digite o nome do turno"
					classNames={{
						formItem: "col-span-3 sm:col-span-3 md:col-span-1 lg:col-span-1 xl:col-span-1",
					}}
					description="description"
				/>
				<TimePickerWithSecondsForm
					form={form}
					formFieldName="nightlyFactorCode"
					label="Fator horário noturno"
					placeholder="Digite o nome do turno"
					classNames={{
						formItem: "col-span-3 sm:col-span-3 md:col-span-1 lg:col-span-1 xl:col-span-1",
					}}
					description="description"
				/>
				<SelectForm
					form={form}
					formFieldName="extendedNightlyShiftCode"
					label="Noturno estendido (simula 60)"
					datas={sysConfigEnumAdapters({ field: "extendedNightlyShift", parameters })}
					placeholder="Digite o nome do cargo"
					classNames={{
						formItem: "col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-3",
					}}
					description="description"
				/>
				<SelectForm
					form={form}
					datas={[{ label: "Normais", value: "0" }]}
					formFieldName="sundaysAndHolidaysOnTurnOfDayCode"
					label="Domingos e feriados ao virar dia"
					placeholder="Digite o nome do cargo"
					classNames={{
						formItem: "col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-3",
					}}
					description="description"
				/>
			</GridForm>
		</ScrollArea>
	);
}
