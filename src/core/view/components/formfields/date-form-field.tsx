import type { DateFormFieldParams } from "@/domain/components/formfields/date-form-field";
import { getValueByPath } from "@/domain/components/formfields/get-value-by-path";
import { parseTimestampToLocaleDate } from "@/domain/global-helpers/time-tools";
import { useEffect } from "react";
import type { FieldValues, Path, PathValue } from "react-hook-form";
import { DatePicker } from "../datepicker/date-picker";
import { FormField, FormItem } from "../ui/form";
import { LabelForm } from "./label-form";

export default function DateForm<T extends FieldValues>({
	form,
	formFieldName,
	classNames,
	placeholder,
	label,
	description,
	required,
	classNameLabel,
	disabled,
	invalidDates,
}: DateFormFieldParams<T>) {
	const error = getValueByPath(form.formState.errors, formFieldName);
	const hasError = !!error?.message;
	const value = form.watch(formFieldName);
	useEffect(() => {
		if (value === null) {
			form.setValue(formFieldName, new Date() as PathValue<T, Path<T>>);
		}
		if (typeof value === "string") {
			if (value === "") {
				return form.setValue(formFieldName, new Date() as PathValue<T, Path<T>>);
			}
			form.setValue(formFieldName, parseTimestampToLocaleDate(value) as PathValue<T, Path<T>>);
		}
	}, [form, formFieldName, value]);
	return (
		<FormField
			control={form.control}
			name={formFieldName}
			render={({ field }) => (
				<FormItem
					className={`w-full col-span-2 md:col-span-2 lg:col-span-1 ${classNames?.formItem ?? ""}`}
				>
					{label && (
						<LabelForm
							label={label}
							description={description}
							hasError={hasError}
							required={required}
							formFieldName={formFieldName}
							classNameLabel={classNameLabel}
						/>
					)}
					<DatePicker
						value={field.value}
						onDateSelect={field.onChange}
						name={placeholder}
						hasError={hasError}
						id={formFieldName}
						disabled={disabled}
						invalidDates={invalidDates}
					/>
				</FormItem>
			)}
		/>
	);
}
