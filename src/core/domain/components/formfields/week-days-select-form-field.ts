import type { ValueLabel } from "@/domain/value-label";
import type { FieldValues } from "react-hook-form";
import type { FormFieldParams, InputFormClassNamesParams } from "./input-form-field";

export interface WeekDaysSelectFormParams<T extends FieldValues>
	extends FormFieldParams<T>,
	Omit<React.InputHTMLAttributes<HTMLInputElement>, "form"> {
	classNames?: InputFormClassNamesParams;
}

export enum DaysOfWeekEnum {
	sunday = "1",
	monday = "2",
	tuesday = "3",
	wednesday = "4",
	thursday = "5",
	friday = "6",
	saturday = "7",
}

export const DaysOfWeekMap: ValueLabel[] = [
	{ value: DaysOfWeekEnum.sunday, label: "domingo" },
	{ value: DaysOfWeekEnum.monday, label: "segunda" },
	{ value: DaysOfWeekEnum.tuesday, label: "terça" },
	{ value: DaysOfWeekEnum.wednesday, label: "quarta" },
	{ value: DaysOfWeekEnum.thursday, label: "quinta" },
	{ value: DaysOfWeekEnum.friday, label: "sexta" },
	{ value: DaysOfWeekEnum.saturday, label: "sábado" },
];

export function daysOfWeekSelectsToText(days: string[]): string {
	if (!days?.length) return ""
	return days.reduce((acc, currentValue, index) => {
		const lastIndex = days.length - 1;
		const secondLastIndex = lastIndex - 1;
		if (index + 1 > DaysOfWeekMap.length) {
			return "";
		}
		if (index === 0) {
			return (
				acc +
				DaysOfWeekMap.find(({ value, label }) =>
					currentValue === value ? label : "",
				)?.label
			);
		}

		if (index === secondLastIndex) {
			return (
				acc.concat(" e ", DaysOfWeekMap.find(({ value, label }) =>
					currentValue === value ? label : ""
				)?.label ?? '')
				// acc +
				// " e " +
				// DaysOfWeekMap.find(({ value, label }) =>
				// 	currentValue === value ? label : "",
				// )?.label
			);
		}

		if (index === lastIndex) {
			return (
				acc.concat(
					" e ",
					DaysOfWeekMap.find(({ value, label }) =>
						currentValue === value ? label : "",
					)?.label ?? '',
					"."
				)
				// acc +
				// " e " +
				// DaysOfWeekMap.find(({ value, label }) =>
				// 	currentValue === value ? label : "",
				// )?.label +
				// "."
			);
		}

		return (
			acc.concat(
				", ",
				DaysOfWeekMap.find(({ value, label }) =>
					currentValue === value ? label : "",
				)?.label ?? ''
			)
			// acc +
			// ", " +
			// DaysOfWeekMap.find(({ value, label }) =>
			// 	currentValue === value ? label : "",
			// )?.label
		);
	}, "");
}
