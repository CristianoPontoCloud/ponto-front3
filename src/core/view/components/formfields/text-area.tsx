"use client";
import { getValueByPath } from "@/domain/components/formfields/get-value-by-path";
import type { TextAreaFormParams } from "@/domain/components/formfields/text-area-form";
import { FormControl, FormField, FormItem } from "@/view/components/ui/form";
import type { FieldValues } from "react-hook-form";
import { tv } from "tailwind-variants";
import { Textarea } from "../ui/textarea";
import { LabelForm } from "./label-form";

export function TextAreaForm<T extends FieldValues>({
	formFieldName,
	placeholder,
	form,
	classNames,
	label,
	description,
	required,
	classNameLabel,
	maxLength = 500,
	minLength,
	disabled = false,
}: TextAreaFormParams<T>) {
	const error = getValueByPath(form.formState.errors, formFieldName);
	const hasError = !!error?.message;
	const inputVariants = tv({
		base: classNames?.formItem,
		variants: {
			hasError: {
				true: "border-red-500",
				false: "",
			},
		},
	});
	return (
		<FormField
			control={form.control}
			name={formFieldName}
			render={({ field }) => (
				<FormItem
					className={`w-full col-span-2 md:col-span-2 lg:col-span-1 ${classNames?.formItem ?? ""}`}
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
						<div className="flex gap-1 items-center relative">
							<Textarea
								id={formFieldName}
								placeholder={placeholder}
								data-testid={`input-${formFieldName}`}
								{...field}
								maxLength={maxLength}
								minLength={minLength}
								onChange={(e) => {
									field.onChange(e.target.value);
								}}
								value={field.value || ""}
								className={inputVariants({ hasError })}
								disabled={disabled}
							/>
						</div>
					</FormControl>
				</FormItem>
			)}
		/>
	);
}
