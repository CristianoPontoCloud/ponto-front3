import { useTopOffset } from "@/application/hooks/use-top-off-set";
import { useSysConfigStore } from "@/application/providers/sys-config/use-sys-config";
import { sysConfigEnumAdapters } from "@/application/usecases/sys-config-paramters-maper";
import type { TurnFormProps } from "@/domain/entities/turns/turns";
import type { ValueLabel } from "@/domain/value-label";
import { GridForm } from "@/view/components/formfields/grid-from";
import { InputForm } from "@/view/components/formfields/input-form-field";
import SelectForm from "@/view/components/formfields/select-form";
import { TimePickerForm } from "@/view/components/formfields/time-picker-form";
import { ScrollArea } from "@/view/components/ui/scroll-area";
import { useRef } from "react";
import { useFormContext } from "react-hook-form";

export function HourParametersForm() {
	const form = useFormContext<TurnFormProps>();
	const { parameters } = useSysConfigStore();
	const period = form.watch("periods");
	const freeLunch = form.watch("freeLunchCode");
	function breakfastDataCalculate(): ValueLabel[] {
		if (period === "1") return [{ value: "1", label: "Durante o primeiro peíodo" }];
		const data: ValueLabel[] = [];
		const parsedPeriod = Number(period);
		Array.from({ length: parsedPeriod }).forEach((_, index) => {
			if (index + 1 === parsedPeriod) return;
			data.push({
				value: (index + 2).toString(),
				label: `Período ${index + 1} / Período ${index + 2}  `,
			});
		});

		return data;
	}
	const ref = useRef<HTMLDivElement>(null);
	const height = useTopOffset(ref);
	const span = "col-span-3 sm:col-span-3 md:col-span-2 lg:col-span-1 xl:col-span-1";
	return (
		<ScrollArea
			className="w-full p-1 flex flex-col gap-4"
			data-testid="form-dsr"
			ref={ref}
			style={{ height: height - 60 }}
		>
			<GridForm className="w-full pt-0 mt-0" gridCol="2">
				<SelectForm
					form={form}
					formFieldName="compensationModeCode"
					label="Modo de compensação"
					placeholder="Selecione o modo de compensação"
					// datas={[{ label: "Diário", value: "1" }]}
					datas={sysConfigEnumAdapters({ field: "compensationMode", parameters })}
					description="description"
					classNames={{ formItem: span }}
				/>
				<SelectForm
					form={form}
					formFieldName="extraTimeUnderAnHourCode"
					label="Extra quando o intervalo for menor que 1 hora"
					placeholder="Selecione o intervalo"
					datas={sysConfigEnumAdapters({ field: "extraTimeUnderAnHour", parameters })}
					description="description"
					classNames={{ formItem: span }}
				/>
				<SelectForm
					form={form}
					formFieldName="deducingFromExtraTimeModeCode"
					label="Maneira de descontar faltas das horas extras"
					placeholder="Selecione a maneira"
					datas={sysConfigEnumAdapters({ field: "deducingFromExtraTimeMode", parameters })}
					description="description"
					classNames={{ formItem: span }}
				/>
				<SelectForm
					form={form}
					formFieldName="workingModeCode"
					label="Modo da operação da opção em dia sem jornada"
					placeholder="Selecione o modo de operação"
					datas={sysConfigEnumAdapters({ field: "workingMode", parameters })}
					description="description"
					classNames={{ formItem: span }}
				/>
				<SelectForm
					form={form}
					formFieldName="extraHourCalculationModeCode"
					label="Cálculo de horas extra interjonada"
					placeholder="Selecione o modo de operação"
					datas={sysConfigEnumAdapters({ field: "extraHourCalculationMode", parameters })}
					// datas={[{ label: "Não calcula", value: "1" }]}
					description="description"
					classNames={{ formItem: span }}
				/>
				<InputForm
					form={form}
					formFieldName="interspersedOvertimePercentage"
					label="Percentual a ser aplicado nas horas extra interjonada"
					placeholder="Selecione o modo de operação"
					description="description"
					classNames={{ formItem: span }}
					onlyNumbers
					max={100}
				/>
				<TimePickerForm
					form={form}
					formFieldName="minimumIntervalValue"
					label="Intervalo mínimo de horas interjornada"
					placeholder="00:00"
					description="description"
					classNames={{ formItem: span }}
				/>
				<SelectForm
					form={form}
					formFieldName="seeNR17FieldNameCode"
					label="Controlar pausa NR17"
					placeholder="Selecione o controle de pausa"
					datas={sysConfigEnumAdapters({ field: "yesNo", parameters })}
					description="description"
					classNames={{ formItem: span }}
				/>
				<SelectForm
					form={form}
					formFieldName="freeLunchCode"
					label="Almoço livre"
					placeholder="Período a considerar almoço livre"
					datas={sysConfigEnumAdapters({ field: "yesNo", parameters })}
					description="description"
					classNames={{ formItem: span }}
				/>
				<SelectForm
					form={form}
					formFieldName="periodToConsiderFreeLunch"
					label="Período a considerar almoço livre"
					placeholder="Selecione o período"
					datas={breakfastDataCalculate()}
					description="description"
					classNames={{ formItem: span }}
					disabled={freeLunch === "2"}
				/>
			</GridForm>
		</ScrollArea>
	);
}
