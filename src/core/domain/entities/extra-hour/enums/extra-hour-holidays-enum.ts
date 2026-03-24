import type { ValueLabel } from "@/domain/value-label";

export enum ExtraHourHolidayEnum {
	EVERY_DAY = "EVERY_DAY",
	ONLY_HOLIDAYS = "ONLY_HOLIDAYS",
	NORMAL_DAYS = "NORMAL_DAYS",
}

export const extraHourHolidaysMap: ValueLabel[] = [
	{ label: "Todos os dias", value: ExtraHourHolidayEnum.EVERY_DAY },
	{ label: "Somente feriados", value: ExtraHourHolidayEnum.ONLY_HOLIDAYS },
	{ label: "Dias normais", value: ExtraHourHolidayEnum.NORMAL_DAYS },
];

export function getExtraHourHoliday(day: string): ValueLabel {
	return (
		extraHourHolidaysMap.find((option) => day === option.value) ?? {
			value: "",
			label: "não encontrado",
		}
	);
}
