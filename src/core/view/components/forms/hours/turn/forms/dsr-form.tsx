import { useTopOffset } from "@/application/hooks/use-top-off-set";
import { useSysConfigStore } from "@/application/providers/sys-config/use-sys-config";
import { sysConfigEnumAdapters } from "@/application/usecases/sys-config-paramters-maper";
import type { TurnFormProps } from "@/domain/entities/turns/turns";
import { GridForm } from "@/view/components/formfields/grid-from";
import SelectForm from "@/view/components/formfields/select-form";
import { TimePickerForm } from "@/view/components/formfields/time-picker-form";
import { ScrollArea } from "@/view/components/ui/scroll-area";
import { useRef } from "react";
import { useFormContext } from "react-hook-form";

export function DsrForm() {
	const form = useFormContext<TurnFormProps>();
	const ref = useRef<HTMLDivElement>(null);
	const { parameters } = useSysConfigStore();
	const height = useTopOffset(ref);
	const span = "col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1";
	return (
		<ScrollArea
			className="w-full p-1 gap-4"
			data-testid="form-dsr"
			ref={ref}
			style={{ height: height - 60 }}
		>
			<GridForm className="w-full pt-0 mt-0 ">
				<TimePickerForm
					form={form}
					formFieldName="dsrTimingCode"
					label="Tempo do DSR"
					placeholder="Digite o nome do turno"
					classNames={{ formItem: span }}
				/>
				<SelectForm
					form={form}
					formFieldName="dsrHolidayDiscountingCode"
					label="Desconto DSR em feriados"
					placeholder="Digite o nome do cargo"
					classNames={{ formItem: span }}
					datas={sysConfigEnumAdapters({ field: "dsrHolidayDiscounting", parameters })}
				/>
				<SelectForm
					form={form}
					formFieldName="dsrDiscountingCode"
					label="Modo de desconto de DSR"
					placeholder="Digite o nome do cargo"
					classNames={{ formItem: span }}
					datas={sysConfigEnumAdapters({ field: "dsrDiscounting", parameters })}
				/>
				<TimePickerForm
					form={form}
					formFieldName="maximumDsrAbsences"
					label="Máximo de faltas em DSR"
					placeholder="Digite o nome do cargo"
					classNames={{ formItem: span }}
				/>
			</GridForm>
		</ScrollArea>
	);
}
