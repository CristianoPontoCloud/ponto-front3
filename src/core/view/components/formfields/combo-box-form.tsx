import type { ComboboxFormFieldParams } from "@/domain/components/formfields/combo-box-form";
import { getValueByPath } from "@/domain/components/formfields/get-value-by-path";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { ValueLabel } from "@/domain/value-label";
import { createPontoCloudApi } from "@/infra/adapters/ponto-cloud-api";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import type { FieldValues, Path, PathValue } from "react-hook-form";
import { Combobox } from "../combo-box/combo-box";
import { FormField, FormItem } from "../ui/form";
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

export default function ComboboxForm<T extends FieldValues>(props: ComboboxFormFieldParams<T>) {
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
		IconLeftOnList,
		isLoading,
	} = props;

	const error = getValueByPath(form.formState.errors, formFieldName);
	const hasError = !!error?.message;

	const { data } = useSession();
	const token = data?.user.token ?? "";

	const shouldUseEndpoint = "endpoint" in props;

	const { data: dynamicData = [] } = useQuery({
		queryKey: ["combobox-options", props.endpoint, props.endpoint, token],
		queryFn: async () => {
			return await getOptions(token, props.endpoint ?? "");
		},
		enabled: shouldUseEndpoint,
	});

	const options = shouldUseEndpoint ? dynamicData : (props.datas ?? []);
	return (
		<FormField
			control={form.control}
			name={formFieldName}
			render={({ field }) => (
				<FormItem
					className={`w-full col-span-1 md:col-span-2 lg:col-span-1 ${classNames?.formItem}`}
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
								disabled,
							}}
						/>
					)}
					<Combobox
						onChangeValue={(value: string) => {
							form.setValue(formFieldName, value as PathValue<T, Path<T>>);
						}}
						datas={options}
						disabled={disabled}
						value={field.value}
						placeholder={placeholder}
						IconLeftOnList={IconLeftOnList}
						classNames={classNames}
						isLoading={isLoading}
					/>
				</FormItem>
			)}
		/>
	);
}
