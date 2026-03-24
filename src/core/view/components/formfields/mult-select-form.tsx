"use client";
import { getValueByPath } from "@/domain/components/formfields/get-value-by-path";
import type { MultiSelectFormFieldParams } from "@/domain/components/formfields/mult-select-form";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import type { FieldValues, Path, PathValue } from "react-hook-form";
import { tv } from "tailwind-variants";
import { FormField, FormItem } from "../ui/form";
import { MultiSelect, type MultiSelectProps } from "../ui/multi-select";
import { LabelForm } from "./label-form";

function getOptions<Response extends { id: string; name: string }>(
	token: string,
	endpoint: string,
): Promise<MultiSelectProps["options"]> {
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

export default function MultiSelectForm<T extends FieldValues>(
	props: MultiSelectFormFieldParams<T>,
) {
	const {
		form,
		formFieldName,
		classNames,
		placeholder,
		label,
		description,
		required,
		// maxCount,
		maxLines,
		variant,
		disabled = false,
		classNameLabel,
		animation,
	} = props;
	const error = getValueByPath(form.formState.errors, formFieldName);
	const hasError = !!error?.message;
	const watchedValue = form.watch(formFieldName);
	const { data } = useSession();
	const token = data?.user.token ?? "";
	const shouldUseEndpoint = "endpoint" in props;

	const { data: dynamicData = [], isLoading } = useQuery({
		queryKey: ["multi-select-options", props.endpoint, token],
		queryFn: () => getOptions(token, props.endpoint ?? ""),
		enabled: !!token, // só roda se token estiver disponível
	});
	const isLoadingCase = isLoading && shouldUseEndpoint;
	const options = shouldUseEndpoint ? dynamicData : (props.options ?? []);

	function onValueChange(values: string[]) {
		const selectedValues = options
			.filter((obj) => values.includes(obj.value))
			.map((obj) => obj.value);

		form.setValue(formFieldName as Path<T>, selectedValues as PathValue<T, Path<T>>, {
			shouldDirty: true,
		});
	}

	const inputVariants = tv({
		extend: classNames?.multSelect,
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
			render={() => {
				return (
					<FormItem
						className={`w-full col-span-1 md:col-span-2 lg:col-span-1 ${classNames?.formItem}`}
					>
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
						<MultiSelect
							className={inputVariants({ hasError })}
							options={options}
							onValueChange={onValueChange}
							defaultValue={watchedValue}
							placeholder={isLoadingCase ? "Carregando..." : placeholder}
							variant={variant}
							animation={animation}
							// maxCount={maxCount}
							maxLines={maxLines}
							disabled={disabled || isLoadingCase}
						/>
					</FormItem>
				);
			}}
		/>
	);
}
