import { useEffect, useState } from "react";
interface UseTimePickerParams {
	value: string;
	setValue: (value: string) => void;
}
export function useTimePicker({ setValue, value }: UseTimePickerParams) {
	const minutesAndSecondsMap = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));
	const hoursMap = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
	const initialValue = String(value).split(":");
	function initialValueStates(index: number) {
		return initialValue.length > 1 && initialValue[index] !== undefined
			? initialValue[index]
			: "00";
	}

	const [hour, setHour] = useState<string | undefined>(initialValueStates(0));
	const [minute, setMinute] = useState<string | undefined>(initialValueStates(1));
	const [seconds, setSeconds] = useState<string | undefined>(initialValueStates(2));

	const showHour = hour !== undefined && minute !== undefined && seconds !== undefined;
	const time = `${hour}:${minute}:${seconds}`;

	useEffect(() => {
		if (showHour && time !== value) {
			setValue(time);
		}
	}, [showHour, time, value, setValue]);

	return {
		showHour,
		time,
		hoursMap,
		hour,
		setHour,
		seconds,
		setSeconds,
		minute,
		setMinute,
		minutesAndSecondsMap,
	};
}
