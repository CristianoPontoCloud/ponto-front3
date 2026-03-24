import type { ValueLabel } from "@/domain/value-label";
import { extraHourHolidaysMap } from "./extra-hour-holidays-enum";

export enum ExtraHourDayEnum {
	EVERY_DAY = "EVERY_DAY",
	NORMAL_WORK_DAYS = "NORMAL_WORK_DAYS",
	VACATION_DAYS = "VACATION_DAYS",
	SPECIFIC_DAYS = "SPECIFIC_DAYS",
}

export const extraHourDayMap: ValueLabel[] = [
	{ label: "Todos os dias ", value: ExtraHourDayEnum.EVERY_DAY },
	{ label: "Dias com trabalho previsto ", value: ExtraHourDayEnum.NORMAL_WORK_DAYS },
	{ label: "Dias folga ", value: ExtraHourDayEnum.VACATION_DAYS },
	{ label: "Dia específico ", value: ExtraHourDayEnum.SPECIFIC_DAYS },
];

export function getExtraHourDay(day: string): ValueLabel {
	return (
		extraHourDayMap.find((option) => day === option.value) ?? {
			value: "",
			label: "não encontrado",
		}
	);
}

export function getExtraHourHoliday(holiday: string): ValueLabel {
	return (
		extraHourHolidaysMap.find((option) => holiday === option.value) ?? {
			value: "",
			label: "não encontrado",
		}
	);
}
