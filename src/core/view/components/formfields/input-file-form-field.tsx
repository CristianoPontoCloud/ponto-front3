"use client";
import { getValueByPath } from "@/domain/components/formfields/get-value-by-path";
import type { InputFormParams } from "@/domain/components/formfields/input-form-field";
import { FormControl, FormField, FormItem } from "@/view/components/ui/form";
import { Input } from "@/view/components/ui/input";
import type { FieldValues } from "react-hook-form";
import { tv } from "tailwind-variants";
import { LabelForm } from "./label-form";

export function InputFileForm<T extends FieldValues>({
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

	return (
		<FormField
			control={form.control}
			name={formFieldName}
			render={({ field }) => (
				<FormItem
					className={`w-full col-span-2 md:col-span-2 lg:col-span-1 ${classNames?.formItem ?? ""}`}
					data-testid={`form-item-${formFieldName}`}
				>
					{label && formFieldName && (
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
						<div className="flex gap-1 items-center h-9 relative">
							{OutsideLeftChild && <OutsideLeftChild />}
							<Input
								id={formFieldName}
								placeholder={placeholder}
								data-testid={`input-${formFieldName}`}
								multiple={false}
								{...field}
								type={"file"}
								onChange={(e) => {
									const files = e.target.files;
									if (files) {
										const fileList = Array.from(files);
										// const oversizedFiles = fileList.filter(
										// 	(file) => file.size > MAX_UPLOAD_SIZE
										// );
										field.onChange(fileList);
									}
								}}
								value={undefined}
								className={inputVariants({ hasError })}
								disabled={disabled}
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
