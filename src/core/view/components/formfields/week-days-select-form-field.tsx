"use client";
import { getValueByPath } from "@/domain/components/formfields/get-value-by-path";
import type { WeekDaysSelectFormParams } from "@/domain/components/formfields/week-days-select-form-field";
import type { ValueLabel } from "@/domain/value-label";
import { FormControl, FormField, FormItem } from "@/view/components/ui/form";
import type { FieldValues, Path, PathValue } from "react-hook-form";
import { tv } from "tailwind-variants";
import { Button } from "../ui/button";
import { LabelForm } from "./label-form";

export function WeekDaysSelectForm<T extends FieldValues>({
	formFieldName,
	form,
	classNames,
	label,
	description,
	required,
	classNameLabel,
	disabled,
}: WeekDaysSelectFormParams<T>) {
	const error = getValueByPath(form.formState.errors, formFieldName);
	const hasError = !!error?.message;
	const days: string[] = form.watch(formFieldName);
	const inputVariants = tv({
		extend: classNames?.formItem,
		variants: {
			hasError: {
				true: "border-red-500 text-red-500",
				false: "",
			},
		},
	});

	const daysMap: ValueLabel[] = [
		{ value: "1", label: "Domingo" },
		{ value: "2", label: "Segunda" },
		{ value: "3", label: "Terça" },
		{ value: "4", label: "Quarta" },
		{ value: "5", label: "Quinta" },
		{ value: "6", label: "Sexta" },
		{ value: "7", label: "Sábado" },
	];
	return (
		<FormField
			control={form.control}
			name={formFieldName}
			render={() => (
				<FormItem
					className={`col-span-2 md:col-span-2 lg:col-span-1 ${classNames?.formItem ?? ""}`}
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
						<div
							id={"week-days-select"}
							className="flex gap-1 items-center h-9 relative"
							aria-valuetext={form.watch(formFieldName)}
						>
							{daysMap.flatMap(({ label, value }, index) => (
								<Button
									id={label.toLowerCase()}
									key={index.toString()}
									type="button"
									size="icon"
									disabled={disabled}
									className={inputVariants({ hasError })}
									variant={days.includes(value[0]) ? "default" : "outline"}
									onClick={() => {
										let newDays = [...days];
										if (days.includes(value)) {
											newDays = newDays.filter((v) => v !== value);
											form.setValue(formFieldName, newDays as PathValue<T, Path<T>>);
											return;
										}
										newDays.push(value);
										form.setValue(formFieldName, newDays as PathValue<T, Path<T>>);
									}}
								>
									{label[0]}
								</Button>
							))}
						</div>
					</FormControl>
				</FormItem>
			)}
		/>
	);
}
