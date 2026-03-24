import { getValueByPath } from "@/domain/components/formfields/get-value-by-path";
import type { SelectTabsFormFieldParams } from "@/domain/components/formfields/select-tabs-form";
import type { FieldValues, Path, PathValue } from "react-hook-form";
import { tv } from "tailwind-variants";
import { SelectTabs } from "../select-tabs/select-tabs";
import { FormField, FormItem } from "../ui/form";
import { LabelForm } from "./label-form";

export default function SelectTabsForm<T extends FieldValues>({
	form,
	formFieldName,
	classNames,
	options,
	label,
	description,
	required,
	classNameLabel,
	// disabled = false,
}: SelectTabsFormFieldParams<T>) {
	const error = getValueByPath(form.formState.errors, formFieldName);
	const hasError = !!error?.message;
	// const [isSelected, setIsSelected] = useState<boolean>(
	// 	!!form.watch(formFieldName),
	// );
	// const watchedValue = form.watch(formFieldName);

	// useEffect(() => {
	// 	setIsSelected(!!watchedValue);
	// }, [watchedValue]);

	const inputVariants = tv({
		base: `w-full col-span-1 md:col-span-2 lg:col-span-1 ${classNames?.formItem ?? ""}`,
		variants: {
			hasError: {
				true: "border rounded-lg border-red-500",
				false: "",
			},
			// isSelected: {
			// 	true: "text-background-foreground",
			// 	false: "",
			// },
		},
	});

	function onValueChange(value: string) {
		form.setValue(formFieldName, value as PathValue<T, Path<T>>);
		form.trigger(formFieldName);
	}
	return (
		<FormField
			control={form.control}
			name={formFieldName}
			render={({ field }) => (
				<FormItem className={inputVariants({ hasError })}>
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
					<SelectTabs options={options} onValueChange={onValueChange} value={field.value} />
				</FormItem>
			)}
		/>
	);
}
