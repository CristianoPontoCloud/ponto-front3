import type { ValueLabel } from "@/domain/value-label";

export enum ExtraHourAccumulatedEnum {
	DAILY = "DAILY",
	WEEKLY = "WEEKLY",
	MONTHLY = "MONTHLY",
}

export const extraHourAccumulatedMap: ValueLabel[] = [
	{ label: "Diário ", value: ExtraHourAccumulatedEnum.DAILY },
	{ label: "Semanal", value: ExtraHourAccumulatedEnum.WEEKLY },
	{ label: "Mensal", value: ExtraHourAccumulatedEnum.MONTHLY },
];

export function getExtraHourAccumulated(day: string): ValueLabel {
	return (
		extraHourAccumulatedMap.find((option) => day === option.value) ?? {
			value: "",
			label: "não encontrado",
		}
	);
}
