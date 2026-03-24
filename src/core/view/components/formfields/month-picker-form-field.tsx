import { getValueByPath } from "@/domain/components/formfields/get-value-by-path";
import type { MonthPickerFormFieldParams } from "@/domain/components/formfields/mouth-form-field";
import { useCallback } from "react";
import type { FieldValues, Path, PathValue } from "react-hook-form";
import { MonthPicker } from "../month-picker/month-picker";
import { FormField, FormItem } from "../ui/form";
import { LabelForm } from "./label-form";

export default function MonthPickerForm<T extends FieldValues>({
	form,
	formFieldName,
	classNames,
	placeholder,
	label,
	description,
	required,
	classNameLabel,
	disabled,
	// invalidDates
}: MonthPickerFormFieldParams<T>) {
	const error = getValueByPath(form.formState.errors, formFieldName);
	const hasError = !!error?.message;
	const handleChangeMonth = useCallback(
		(value: string) => {
			form.setValue(formFieldName, value as PathValue<T, Path<T>>);
			form.trigger(formFieldName);
		},
		[form, formFieldName],
	);
	return (
		<FormField
			control={form.control}
			name={formFieldName}
			render={({ field }) => (
				<FormItem
					className={`col-span-2 md:col-span-2 lg:col-span-1 ${classNames?.formItem ?? ""}`}
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
					<MonthPicker
						onChangeMonth={handleChangeMonth}
						value={field.value}
						hasError={hasError}
						disabled={disabled}
						placeholder={placeholder}
						// invalidDates={invalidDates}
					/>
				</FormItem>
			)}
		/>
	);
}
