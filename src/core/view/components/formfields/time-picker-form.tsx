"use client";
import { getValueByPath } from "@/domain/components/formfields/get-value-by-path";
import type { TimePickerFormParams } from "@/domain/components/formfields/time-picker-form";
import { FormControl, FormField, FormItem } from "@/view/components/ui/form";
import type { FieldValues, Path, PathValue } from "react-hook-form";
import { TimePicker } from "../time-picker/time-picker";
import { LabelForm } from "./label-form";

export function TimePickerForm<T extends FieldValues>({
	formFieldName,
	form,
	label,
	description,
	required,
	classNames,
	classNameLabel,
	disabled,
	maxTime,
	minTime,
}: TimePickerFormParams<T>) {
	const error = getValueByPath(form.formState.errors, formFieldName);
	const hasError = !!error?.message;
	const value = form.watch(formFieldName);
	function setValue(value: string) {
		form.setValue(formFieldName, value as PathValue<T, Path<T>>);
	}
	return (
		<FormField
			control={form.control}
			name={formFieldName}
			render={() => (
				<FormItem
					className={`w-full col-span-1 md:col-span-2 lg:col-span-1 ${classNames?.formItem ?? ""}`}
					data-testid={`form-item-${formFieldName}`}
				>
					{label && <LabelForm
						{...{
							label,
							description,
							required,
							hasError,
							formFieldName,
							classNameLabel,
							disabled,
						}}
					/>}
					<FormControl>
						<TimePicker
							{...{
								label,
								// form,
								// formFieldName,
								// field,
								value,
								setValue,
								hasError,
								disabled,
								maxTime,
								minTime,
							}}
						/>
					</FormControl>
				</FormItem>
			)}
		/>
	);
}
