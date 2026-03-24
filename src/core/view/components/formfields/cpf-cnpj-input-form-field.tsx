"use client";
import { getValueByPath } from "@/domain/components/formfields/get-value-by-path";
import type { InputFormParams } from "@/domain/components/formfields/input-form-field";
import { FormControl, FormField, FormItem } from "@/view/components/ui/form";
import { Input } from "@/view/components/ui/input";
import type { FieldValues } from "react-hook-form";
import { tv } from "tailwind-variants";
import { LabelForm } from "./label-form";

export function CpfCnpjInputForm<T extends FieldValues>({
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

	function regexCpf(value: string) {
		return value
			.replace(/(\w{3})(\w)/, "$1.$2")
			.replace(/(\w{3})(\w)/, "$1.$2")
			.replace(/(\w{3})(\w{1,2})$/, "$1-$2");
	}
	function regexCnpj(value: string) {
		return value
			.replace(/^(\w{2})(\w)/, "$1.$2")
			.replace(/^(\w{2})\.(\w{3})(\w)/, "$1.$2.$3")
			.replace(/^(\w{2})\.(\w{3})\.(\w{3})(\w)/, "$1.$2.$3/$4")
			.replace(/^(\w{2})\.(\w{3})\.(\w{3})\/(\w{4})(\w{0,2})/, "$1.$2.$3/$4-$5");
	}

	const format = (value: string) => {
		const cleaned = value.replace(/[^\w]/g, "");
		if (cleaned.length <= 11) {
			return regexCpf(cleaned);
		}
		return regexCnpj(cleaned);
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
								onChange={(e) => field.onChange(format(e.target.value))}
								maxLength={18}
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
