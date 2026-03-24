import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import type {
	ControllerRenderProps,
	FieldValues,
	Path,
	PathValue,
	UseFormReturn,
} from "react-hook-form";
interface UseTimePickerParams<T extends FieldValues> {
	startTimeKeyForm: Path<T>;
	endTimeKeyForm: Path<T>;
	currentEditField: Path<T>;
	setCurrentEditField: Dispatch<SetStateAction<Path<T>>>;
	form: UseFormReturn<T>;
	field: ControllerRenderProps<T, Path<T>>;
}
export function useTimeRangePicker<T extends FieldValues>({
	field,
	form,
	endTimeKeyForm,
	startTimeKeyForm,
	currentEditField,
	setCurrentEditField,
}: UseTimePickerParams<T>) {
	const startTime = form.watch(startTimeKeyForm);
	const endTime = form.watch(endTimeKeyForm);
	const [startHasAlreadyFilled, setStartHasAlreadyFilled] = useState<boolean>(false);
	const minutesAndSecondsMap = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));
	const hoursMap = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
	const initialValue = String(field.value).split(":");
	function initialValueStates(index: number) {
		return initialValue.length > 1 ? initialValue[index] : undefined;
	}

	const [hour, setHour] = useState<string | undefined>(initialValueStates(0));
	const [minute, setMinute] = useState<string | undefined>(initialValueStates(1));

	const showHour = hour !== undefined && minute !== undefined;

	const time = `${hour}:${minute}`;

	function resetTime(key?: Path<T>) {
		setHour(undefined);
		setMinute(undefined);
		if (!key) return;
		form.setValue(key, "" as PathValue<T, Path<T>>);
	}
	function setTime(values: string[]) {
		if (values.length < 2) return resetTime();
		setHour(values[0]);
		setMinute(values[1]);
	}

	function changeToStart() {
		if (currentEditField === startTimeKeyForm) return;
		setCurrentEditField(startTimeKeyForm);
		const splitedStart = String(startTime).split(":");
		setTime(splitedStart);
	}
	function changeToEnd() {
		if (currentEditField === endTimeKeyForm) return;
		setCurrentEditField(endTimeKeyForm);
		const splitedEnd = String(endTime).split(":");
		setTime(splitedEnd);
	}
	function endHourDisable(value: string): boolean {
		const splitedStart = startTime.split(":");
		if (splitedStart.length < 2) return false;
		return Number(splitedStart[0]) > Number(value) && currentEditField === endTimeKeyForm;
	}
	function endMinuteDisable(value: string): boolean {
		const splitedStart = startTime.split(":");
		if (splitedStart.length < 2) return false;
		return Number(splitedStart[1]) >= Number(value) && currentEditField === endTimeKeyForm;
	}

	function showStartValue(label: string) {
		return startTime.length === 5 ? startTime : label;
	}
	function showEndValue(label: string) {
		return endTime.length === 5 ? endTime : label;
	}

	useEffect(() => {
		if (showHour) {
			form.setValue(currentEditField, time as PathValue<T, Path<T>>);
			if (!startHasAlreadyFilled) {
				resetTime();
				changeToEnd();
				setStartHasAlreadyFilled(true);
			}
			form.trigger(currentEditField);
		}
	}, [hour, minute]);

	useEffect(() => {
		if (currentEditField === startTimeKeyForm && startTime && endTime) {
			const [startH, startM] = String(startTime).split(":").map(Number);
			const [endH, endM] = String(endTime).split(":").map(Number);

			const startTotal = startH * 60 + startM;
			const endTotal = endH * 60 + endM;

			if (endTotal < startTotal) {
				// form.setValue(endTimeKeyForm, startTime as PathValue<T, Path<T>>);
				// form.trigger(endTimeKeyForm);
				resetTime(endTimeKeyForm);
			}
		}
	}, [startTime]);
	return {
		showHour,
		time,
		hoursMap,
		hour,
		setHour,
		minute,
		setMinute,
		minutesAndSecondsMap,
		startTime,
		endTime,
		changeToStart,
		changeToEnd,
		endHourDisable,
		endMinuteDisable,
		showStartValue,
		showEndValue,
	};
}
