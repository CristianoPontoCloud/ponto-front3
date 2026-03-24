"use client";
import { getValueByPath } from "@/domain/components/formfields/get-value-by-path";
import type { InputFormParams } from "@/domain/components/formfields/input-form-field";
import { FormControl, FormField, FormItem } from "@/view/components/ui/form";
import { Input } from "@/view/components/ui/input";
import "@/view/styles/globals.css";
import type { FieldValues } from "react-hook-form";
import { tv } from "tailwind-variants";
import { LabelForm } from "./label-form";

export function CepInputForm<T extends FieldValues>({
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
	type,
	min,
	minLength,
	disabled,
}: Omit<InputFormParams<T>, "rightNote" | "HeadGenericComponent">) {
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

	const formatCep = (value: string) => {
		return value
			.replace(/[^0-9]/g, "")
			.replace(/(\d{5})(\d{1,3})/, "$1-$2")
			.substring(0, 9);
	};

	return (
		<FormField
			control={form.control}
			name={formFieldName}
			render={({ field }) => (
				<FormItem
					className={`w-full col-span-1 md:col-span-2 lg:col-span-1 ${classNames?.formItem}`}
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
						<div className="flex gap-1 items-center h-9">
							{OutsideLeftChild && <OutsideLeftChild />}
							<Input
								id={formFieldName}
								name={formFieldName}
								placeholder={placeholder}
								data-testid={`input-${formFieldName}`}
								value={field.value || ""}
								onChange={(e) => field.onChange(formatCep(e.target.value))}
								maxLength={14}
								type={type}
								minLength={minLength}
								min={min}
								className={inputVariants({ hasError })}
								disabled={disabled}
							/>
							{OutsideRightChild && <OutsideRightChild />}
						</div>
					</FormControl>
				</FormItem>
			)}
		/>
	);
}
