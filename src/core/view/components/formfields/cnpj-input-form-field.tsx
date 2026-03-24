"use client";
import { getValueByPath } from "@/domain/components/formfields/get-value-by-path";
import type { InputFormParams } from "@/domain/components/formfields/input-form-field";
import { FormControl, FormField, FormItem } from "@/view/components/ui/form";
import { Input } from "@/view/components/ui/input";
import type { FieldValues } from "react-hook-form";
import { tv } from "tailwind-variants";
import { LabelForm } from "./label-form";

export function CnpjInputForm<T extends FieldValues>({
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
	onBlur,
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

	function formatCnpj(value: string): string {
		const alphanum = value.replace(/[^\w]/g, ""); // mantém letras e números

		const part1 = alphanum.slice(0, 2);
		const part2 = alphanum.slice(2, 5);
		const part3 = alphanum.slice(5, 8);
		const part4 = alphanum.slice(8, 12);
		const part5 = alphanum.slice(12, 14);

		let result = part1;
		if (part2) result = `${result}.${part2}`;
		if (part3) result = `${result}.${part3}`;
		if (part4) result = `${result}/${part4}`;
		if (part5) result = `${result}-${part5}`;

		return result;
	}

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
								onChange={(e) => {
									const input = e.target.value;
									const formatted = formatCnpj(input);
									field.onChange(formatted);
								}}
								maxLength={18}
								type={type}
								minLength={minLength}
								min={min}
								className={inputVariants({ hasError })}
								disabled={disabled}
								onBlur={onBlur}
							/>
							{OutsideRightChild && <OutsideRightChild />}
						</div>
					</FormControl>
				</FormItem>
			)}
		/>
	);
}
