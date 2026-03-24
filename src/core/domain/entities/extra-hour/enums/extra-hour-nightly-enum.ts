import type { ValueLabel } from "@/domain/value-label";

export enum ExtraHourNightlyEnum {
	BOTH = "BOTH",
	ONLY_NIGHTLY_SHIFTS = "ONLY_NIGHTLY_SHIFTS",
	ONLY_DAY_SHIFTS = "ONLY_DAY_SHIFTS",
}

export const extraHourNightMap: ValueLabel[] = [
	{ label: "Ambos", value: ExtraHourNightlyEnum.BOTH },
	{ label: "Somente horários noturno", value: ExtraHourNightlyEnum.ONLY_NIGHTLY_SHIFTS },
	{ label: "Somente horários diurno", value: ExtraHourNightlyEnum.ONLY_DAY_SHIFTS },
];

export function getExtraHourNight(holiday: string): ValueLabel {
	return (
		extraHourNightMap.find((option) => holiday === option.value) ?? {
			value: "",
			label: "não encontrado",
		}
	);
}
