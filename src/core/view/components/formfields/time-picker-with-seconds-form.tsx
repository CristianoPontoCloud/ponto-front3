"use client";
import { getValueByPath } from "@/domain/components/formfields/get-value-by-path";
import type { TimePickerWithSecondsFormParams } from "@/domain/components/formfields/time-picker-with-seconds-form";
import { FormControl, FormField, FormItem } from "@/view/components/ui/form";
import { useCallback } from "react";
import type { FieldValues, Path, PathValue } from "react-hook-form";
import { TimePickerWithSeconds } from "../time-picker-with-seconds/time-picker-with-seconds";
import { LabelForm } from "./label-form";

export function TimePickerWithSecondsForm<T extends FieldValues>({
	formFieldName,
	form,
	label,
	description,
	required,
	classNames,
	classNameLabel,
}: TimePickerWithSecondsFormParams<T>) {
	const error = getValueByPath(form.formState.errors, formFieldName);
	const hasError = !!error?.message;
	const value = form.watch(formFieldName);
	const { setValue, trigger } = form
	const onValueChange = useCallback(
		(value: string) => {
			setValue(formFieldName, value as PathValue<T, Path<T>>);
			trigger(formFieldName);
		},
		[setValue, trigger, formFieldName],
	);
	return (
		<FormField
			control={form.control}
			name={formFieldName}
			render={() => (
				<FormItem
					className={`w-full col-span-1 md:col-span-2 lg:col-span-1 ${classNames?.formItem ?? ""}`}
					data-testid={`form-item-${formFieldName}`}
				>
					{label && (
						<LabelForm
							{...{
								label,
								description,
								required,
								hasError,
								formFieldName,
								classNameLabel,
							}}
						/>
					)}
					<FormControl>
						<TimePickerWithSeconds {...{ value, setValue: onValueChange, hasError }} />
					</FormControl>
				</FormItem>
			)}
		/>
	);
}
