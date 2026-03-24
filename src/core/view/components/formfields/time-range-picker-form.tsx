"use client";
import { getValueByPath } from "@/domain/components/formfields/get-value-by-path";
import type { TimeRangePickerFormParams } from "@/domain/components/formfields/time-picker-range-form";
import { FormControl, FormField, FormItem } from "@/view/components/ui/form";
import { useState } from "react";
import type { FieldValues, Path } from "react-hook-form";
import { TimeRangePicker } from "../time-range-picker/time-range-picker";
import { LabelForm } from "./label-form";

export function TimeRangePickerForm<T extends FieldValues>({
	startTimeKeyForm,
	endTimeKeyForm,
	form,
	label,
	description,
	required,
	classNames,
	classNameLabel,
}: TimeRangePickerFormParams<T>) {
	const errorStart = getValueByPath(form.formState.errors, startTimeKeyForm);
	const errorEnd = getValueByPath(form.formState.errors, endTimeKeyForm);
	const hasErrorStart = !!errorStart?.message;
	const hasErrorEnd = !!errorEnd?.message;
	const hasError = hasErrorStart || hasErrorEnd;
	const [currentEditField, setCurrentEditField] = useState<Path<T>>(startTimeKeyForm);
	return (
		<FormField
			control={form.control}
			name={currentEditField}
			render={({ field }) => (
				<FormItem
					className={`w-full col-span-1 md:col-span-2 lg:col-span-1 ${classNames?.formItem ?? ""}`}
					data-testid={`form-item-${currentEditField}`}
				>
					<LabelForm
						{...{
							label,
							description,
							required,
							hasError,
							formFieldName: currentEditField,
							classNameLabel,
						}}
					/>
					<FormControl>
						<TimeRangePicker
							{...{
								endTimeKeyForm,
								startTimeKeyForm,
								form,
								field,
								hasError,
								currentEditField,
								setCurrentEditField,
							}}
						/>
					</FormControl>
				</FormItem>
			)}
		/>
	);
}
