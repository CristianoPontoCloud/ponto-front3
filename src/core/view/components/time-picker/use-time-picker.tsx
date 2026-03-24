import type { TimeFormat } from "@/domain/entities/time";
import { useEffect, useState } from "react";
interface UseTimePickerParams {
	value: string;
	setValue: (value: string) => void;
	minTime?: TimeFormat;
	maxTime?: TimeFormat;
}
export function useTimePicker({ setValue, value, maxTime, minTime }: UseTimePickerParams) {
	const minutesAndSecondsMap = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));
	const hoursMap = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
	const [maxHour, maxMinute] = String(maxTime)
		.split(":")
		.map((value) => Number(value));
	const [minHour, minMinute] = String(minTime)
		.split(":")
		.map((value) => Number(value));
	const initialValue = String(value).split(":");
	function initialValueStates(index: number) {
		return initialValue.length > 1 ? initialValue[index] : undefined;
	}
	const [hour, setHour] = useState<string | undefined>(initialValueStates(0));
	const [minute, setMinute] = useState<string | undefined>(initialValueStates(1));
	const showHour = hour !== undefined && minute !== undefined;
	const time = `${hour}:${minute}`;
	function hourMaxAndMinUseCase(hour: number): boolean {
		if (hour > maxHour) return true;
		if (hour < minHour) return true;
		return false;
	}
	function minuteMaxAndMinUseCase(minute: number): boolean {
		if (minute > maxMinute) return true;
		if (minute < minMinute) return true;
		return false;
	}
	function handleSetHour(value: string) {
		if (hourMaxAndMinUseCase(Number(value))) return;
		setHour(value);
	}
	function handleSetMinute(value: string) {
		if (minuteMaxAndMinUseCase(Number(value))) return;
		setMinute(value);
	}

	useEffect(() => {
		if (!showHour) return;

		if (value !== time) {
			setValue(time);
		}
	}, [hour, minute, showHour, time, value, setValue]);

	useEffect(() => {
		if ((value ?? "").length < 3) return;
		const [h, m] = value.split(":");
		setHour(h);
		setMinute(m);
	}, [value]);
	return {
		showHour,
		time,
		hoursMap,
		hour,
		setHour,
		minute,
		setMinute,
		minutesAndSecondsMap,
		hourMaxAndMinUseCase,
		minuteMaxAndMinUseCase,
		handleSetHour,
		handleSetMinute,
	};
}
