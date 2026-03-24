"use client";
import { getValueByPath } from "@/domain/components/formfields/get-value-by-path";
import type { InputFormParams } from "@/domain/components/formfields/input-form-field";
import { FormControl, FormField, FormItem } from "@/view/components/ui/form";
import { Input } from "@/view/components/ui/input";
import type { FieldValues } from "react-hook-form";
import { tv } from "tailwind-variants";
import { LabelForm } from "./label-form";

export function PeriodInputForm<T extends FieldValues>({
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
	rightNote,
}: InputFormParams<T>) {
	const error = getValueByPath(form.formState.errors, formFieldName);
	const hasError = !!error?.message;
	const inputVariants = tv({
		extend: classNames?.formItem,
		variants: {
			hasError: {
				true: "border-red-500",
				false: "",
			},
		},
	});

	const onlyNumbersRegex = (value: string) => {
		return value.replace(/[^1-6]/g, (match) => {
			const matchParsed = Number(match);
			if (matchParsed > 6) return "6";
			if (matchParsed < 1) return "1";
			return "1";
		});
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
					<FormControl>
						<div className="flex gap-1 items-center h-9 relative">
							{OutsideLeftChild && <OutsideLeftChild />}
							<Input
								id={formFieldName}
								placeholder={placeholder}
								data-testid={`input-${formFieldName}`}
								{...field}
								maxLength={maxLength}
								type={type}
								minLength={minLength}
								min={min}
								max={max}
								onChange={(e) => {
									e.target.value = onlyNumbersRegex(e.target.value);
									field.onChange(e.target.value);
								}}
								onBlur={(e) => {
									const input = e.target as HTMLInputElement;
									if (input.value.length === 0) {
										input.value = "1";
									}
								}}
								value={field.value || ""}
								className={inputVariants({ hasError })}
								disabled={disabled}
								onKeyDown={(e) => {
									const input = e.target as HTMLInputElement;
									input.value = "";
								}}
							/>
							{rightNote && (
								<p className="absolute right-1 text-muted-foreground text-sm">{rightNote}</p>
							)}
							{OutsideRightChild && <OutsideRightChild />}
						</div>
					</FormControl>
				</FormItem>
			)}
		/>
	);
}
