"use client";
import { getValueByPath } from "@/domain/components/formfields/get-value-by-path";
import type { InputFormParams } from "@/domain/components/formfields/input-form-field";
import { FormControl, FormField, FormItem } from "@/view/components/ui/form";
import { Input } from "@/view/components/ui/input";
import type { FieldValues, Path, PathValue } from "react-hook-form";
import { tv } from "tailwind-variants";
import { LabelForm } from "./label-form";

export function IpInputForm<T extends FieldValues>({
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

	function normalizeIp(ip: string) {
		if (ip === "") return "";
		const normalizedIp = ip
			.split(".")
			.map((octet: string) => String(Number(octet))) // converte para número e volta pra string, removendo zeros à esquerda
			.join(".");
		form.setValue(formFieldName, normalizedIp as PathValue<T, Path<T>>);
	}

	const formatIp = (value: string): string => {
		const cleaned = value.replace(/[^0-9]/g, "");
		const groups = cleaned.match(/.{1,3}/g)?.slice(0, 4) || [];
		return groups.join(".");
	};

	return (
		<FormField
			control={form.control}
			name={formFieldName}
			render={({ field }) => (
				<FormItem
					className={`w-full  col-span-1 md:col-span-2 lg:col-span-1 ${classNames?.formItem ?? ""}`}
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
								onChange={(e) => field.onChange(formatIp(e.target.value))}
								maxLength={15}
								type={type}
								minLength={minLength}
								min={min}
								className={inputVariants({ hasError })}
								disabled={disabled}
								onBlur={(e) => normalizeIp(e.target.value)}
							/>
							{OutsideRightChild && <OutsideRightChild />}
						</div>
					</FormControl>
				</FormItem>
			)}
		/>
	);
}
