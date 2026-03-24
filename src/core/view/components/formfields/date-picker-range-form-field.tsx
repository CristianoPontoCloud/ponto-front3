import type { DatePickerRangeFormFieldParams } from "@/domain/components/formfields/date-range-form-field";
import { getValueByPath } from "@/domain/components/formfields/get-value-by-path";
import { useEffect } from "react";
import type { FieldValues, Path, PathValue } from "react-hook-form";
import { DatePickerWithRange } from "../ui/date-range-picker";
import { FormField, FormItem } from "../ui/form";
import { LabelForm } from "./label-form";

export default function DatePickerRangeForm<T extends FieldValues>({
	form,
	keyDateFrom,
	keyDateTo,
	classNames,
	placeholder,
	label,
	description,
	required,
	classNameLabel,
	disabled,
	invalidDates,
	align = "center",
}: DatePickerRangeFormFieldParams<T>) {
	const errorFrom = getValueByPath(form.formState.errors, keyDateFrom);
	const errorTo = getValueByPath(form.formState.errors, keyDateTo);
	const hasErrorFrom = !!errorFrom?.[keyDateFrom]?.message;
	const hasErrorTo = !!errorTo?.[keyDateTo]?.message;
	const hasError = hasErrorFrom || hasErrorTo;
	const dateTo = form.watch(keyDateTo);
	const dateFrom = form.watch(keyDateFrom);
	useEffect(() => {
		if (typeof dateTo === "string") {
			form.setValue(keyDateTo, new Date(dateTo) as PathValue<T, Path<T>>);
		}
		if (typeof dateFrom === "string") {
			form.setValue(keyDateFrom, new Date(dateFrom) as PathValue<T, Path<T>>);
		}
	}, [dateFrom, dateTo, form, keyDateFrom, keyDateTo]);
	return (
		<FormField
			control={form.control}
			name={keyDateFrom}
			render={() => (
				<FormItem
					className={`col-span-2 md:col-span-2 lg:col-span-1 ${classNames?.formItem ?? ""}`}
				>
					{label && (
						<LabelForm
							label={label}
							description={description}
							hasError={hasError}
							required={required}
							formFieldName={keyDateFrom}
							classNameLabel={classNameLabel}
						/>
					)}
					<DatePickerWithRange
						// form={form}
						// keyFormFrom={keyDateFrom}
						// keyFormTo={keyDateTo}
						dateFrom={form.watch(keyDateFrom)}
						dateTo={form.watch(keyDateTo)}
						onChangeFromDate={(value) => {
							form.setValue(keyDateFrom, value as PathValue<T, Path<T>>, { shouldDirty: true });
							form.trigger(keyDateFrom as PathValue<T, Path<T>>);
						}}
						onChangeToDate={(value) => {
							form.setValue(keyDateTo, value as PathValue<T, Path<T>>, { shouldDirty: true });
							form.trigger(keyDateFrom as PathValue<T, Path<T>>);
						}}
						placeholder={placeholder}
						hasError={hasError}
						disabled={disabled}
						invalidDates={invalidDates}
						align={align}
					/>
				</FormItem>
			)}
		/>
	);
}
