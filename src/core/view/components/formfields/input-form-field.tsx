"use client";
import { getValueByPath } from "@/domain/components/formfields/get-value-by-path";
import type { InputFormParams } from "@/domain/components/formfields/input-form-field";
import { FormControl, FormField, FormItem } from "@/view/components/ui/form";
import { Input } from "@/view/components/ui/input";
import type { FieldValues } from "react-hook-form";
import { tv } from "tailwind-variants";
import { LabelForm } from "./label-form";

export function InputForm<T extends FieldValues>({
	formFieldName,
	placeholder,
	form,
	classNames,
	label,
	description,
	required,
	OutsideLeftChild,
	OutsideRightChild,
	classNameLabel,
	maxLength = 50,
	type,
	min,
	max,
	minLength,
	disabled = false,
	onlyNumbers = false,
	rightNote,
	HeadGenericComponent,
}: InputFormParams<T>) {
	const error = getValueByPath(form.formState.errors, formFieldName);
	const hasError = !!error?.message;
	const inputVariants = tv({
		base: classNames?.input,
		variants: {
			hasError: {
				true: "border-red-500",
				false: "",
			},
		},
	});

	const onlyNumbersRegex = (value: string) => {
		if (value === "") return value.replace(/[^0-9]/g, "");
		if (!!min && Number(value) < Number(min)) {
			return `${min}`;
		}
		if (!!max && Number(value) > Number(max)) {
			return `${max}`;
		}
		return value.replace(/[^0-9]/g, "");
	};

	return (
		<FormField
			control={form.control}
			name={formFieldName}
			render={({ field }) => (
				<FormItem
					className={`w-full col-span-2 md:col-span-2 lg:col-span-1 ${classNames?.formItem ?? ""}`}
					data-testid={`form-item-${formFieldName}`}
				>
					{((label && formFieldName) || HeadGenericComponent) && (
						<div className="flex justify-between items-center h-fit">
							<LabelForm
								{...{
									label,
									description,
									required,
									hasError,
									formFieldName,
									classNameLabel,
									disabled,
								}}
							/>
							{HeadGenericComponent}
						</div>
					)}
					<FormControl>
						<div className="flex gap-1 items-center h-9 relative">
							{OutsideLeftChild && <OutsideLeftChild />}
							<Input
								id={formFieldName}
								placeholder={placeholder}
								data-testid={`input-${formFieldName}`}
								multiple={false}
								maxLength={maxLength}
								type={type}
								minLength={minLength}
								min={min}
								max={max}
								onChange={(e) => {
									if (onlyNumbers) {
										field.onChange(onlyNumbersRegex(e.target.value));
										return;
									}
									field.onChange(e.target.value);
								}}
								value={field.value ? String(field.value) : ""}
								className={inputVariants({ hasError })}
								disabled={disabled}
							/>
							{rightNote && (
								<p className="absolute right-1 text-muted-foreground text-sm ">{rightNote}</p>
							)}
							{OutsideRightChild && <OutsideRightChild />}
						</div>
					</FormControl>
				</FormItem>
			)}
		/>
	);
}
