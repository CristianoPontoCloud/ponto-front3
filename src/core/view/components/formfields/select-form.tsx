import { getValueByPath } from "@/domain/components/formfields/get-value-by-path";
import type { SelectFormFieldParams } from "@/domain/components/formfields/select-form";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { ValueLabel } from "@/domain/value-label";
import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import type { FieldValues } from "react-hook-form";
import { tv } from "tailwind-variants";
import { FormControl, FormField, FormItem } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { LabelForm } from "./label-form";

function getOptions<Response extends { id: string; name: string }>(
	token: string,
	endpoint: string,
): Promise<ValueLabel[]> {
	return createPontoCloudApi(token)
		.get<PaginationDto<Response[]>>(`register/${endpoint}`)
		.then(
			(res) =>
				res.data?.data?.map((item) => ({
					label: item.name,
					value: item.id,
				})) ?? [],
		);
}

export default function SelectForm<T extends FieldValues>(props: SelectFormFieldParams<T>) {
	const {
		form,
		formFieldName,
		classNames,
		placeholder,
		label,
		description,
		required,
		classNameLabel,
		disabled = false,
		HeadGenericComponent,
	} = props;
	const error = getValueByPath(form.formState.errors, formFieldName);
	const hasError = !!error?.message;
	const [isSelected, setIsSelected] = useState<boolean>(!!form.watch(formFieldName));
	const watchedValue = form.watch(formFieldName);

	const { data } = useSession();
	const token = data?.user.token ?? "";
	const shouldUseEndpoint = "endpoint" in props;

	const { data: dynamicData = [] } = useQuery({
		queryKey: ["select-options", props.endpoint, token],
		queryFn: () => getOptions(token, props.endpoint ?? ""),
		enabled: shouldUseEndpoint,
	});

	const options = shouldUseEndpoint ? dynamicData : (props.datas ?? []);

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
						value={field.value ? String(field.value) : ""}
						name={`select-${formFieldName}`}
						disabled={disabled}
					>
						<FormControl className={inputVariants({ hasError, isSelected })}>
							<SelectTrigger className="font-thin">
								<SelectValue placeholder={placeholder} />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							{options.map((data, index) => (
								<SelectItem value={`${data.value}`} key={index.toString()} className="font-thin">
									{data.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</FormItem>
			)}
		/>
	);
}
