import { getValueByPath } from "@/domain/components/formfields/get-value-by-path";
import type { SelectStatusFormFieldParams } from "@/domain/components/formfields/select-status-form";
import { StatusDefaultEnum } from "@/domain/usecases/status-default";
import { useEffect, useState } from "react";
import type { FieldValues } from "react-hook-form";
import { tv } from "tailwind-variants";
import { FormControl, FormField, FormItem } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { LabelForm } from "./label-form";

export const SelectStatusFormDatasDefault = [
	{
		label: "Ativo",
		value: StatusDefaultEnum.active,
	},
	{
		label: "Inativo",
		value: StatusDefaultEnum.inactive,
	},
];
export const SelectStatusFormColorsDefault = [
	{
		color: "bg-lime-500",
		value: StatusDefaultEnum.active,
	},
	{
		color: "bg-red-500",
		value: StatusDefaultEnum.inactive,
	},
];

export default function SelectStatusForm<T extends FieldValues>({
	form,
	formFieldName,
	classNames,
	placeholder,
	customDatas,
	label,
	description,
	required,
	classNameLabel,
	disabled = false,
	customStatus,
	HeadGenericComponent,
}: SelectStatusFormFieldParams<T>) {
	const error = getValueByPath(form.formState.errors, formFieldName);
	const hasError = !!error?.message;
	const [isSelected, setIsSelected] = useState<boolean>(!!form.watch(formFieldName));
	const watchedValue = form.watch(formFieldName);

	useEffect(() => {
		setIsSelected(!!watchedValue);
	}, [watchedValue]);

	const inputVariants = tv({
		extend: classNames?.formItem,
		variants: {
			hasError: {
				true: "border-red-500",
				false: "",
			},
			isSelected: {
				true: "text-background-foreground",
				false: "",
			},
		},
	});
	const status = customStatus ?? SelectStatusFormColorsDefault;
	const datas = customDatas ?? SelectStatusFormDatasDefault;
	function getStatusColor(fieldValue: string): string {
		return status.find((item) => item.value === fieldValue)?.color ?? "";
	}
	return (
		<FormField
			control={form.control}
			name={formFieldName}
			render={({ field }) => (
				<FormItem
					className={`w-full col-span-1 md:col-span-2 lg:col-span-1 ${classNames?.formItem}`}
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
					<Select
						onValueChange={field.onChange}
						value={field.value}
						name={`select-${formFieldName}`}
						disabled={disabled}
					>
						<FormControl className={inputVariants({ hasError, isSelected })}>
							<SelectTrigger className="relative ">
								<SelectValue placeholder={placeholder} />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							<div className="p-2">Status</div>
							{datas.map((data, index) => (
								<SelectItem value={`${data.value}`} key={index.toString()}>
									<div className="flex items-center gap-2">
										<div
											id={getStatusColor(data.value)}
											className={`h-[8px] w-[8px] rounded-full ${getStatusColor(data.value)}`}
										/>
										{data.label}
									</div>
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</FormItem>
			)}
		/>
	);
}
