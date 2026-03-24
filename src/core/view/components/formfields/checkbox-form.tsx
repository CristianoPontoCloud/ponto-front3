import type { CheckboxFormParams } from "@/domain/components/formfields/checkbox-form";
import { getValueByPath } from "@/domain/components/formfields/get-value-by-path";
import type { FieldValues } from "react-hook-form";
import { tv } from "tailwind-variants";
import { Checkbox } from "../ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";

export function CheckboxForm<T extends FieldValues>({
	form,
	formFieldName,
	label,
	classNameFormItem,
	classNameLabel,
	disable = false,
}: CheckboxFormParams<T>) {
	const error = getValueByPath(form.formState.errors, formFieldName);
	const hasError = !!error?.message;
	const inputVariants = tv({
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
					className={`flex flex-row items-start space-x-3 space-y-0 ${classNameFormItem}`}
					data-testid={`checkbox-${formFieldName}`}
				>
					<FormControl>
						<>
							<Checkbox
								id={formFieldName}
								checked={field.value}
								disabled={disable}
								className={inputVariants({ hasError })}
								{...field}
								onCheckedChange={field.onChange}
							/>
							<FormLabel
								data-testid={`label-${formFieldName}`}
								htmlFor={formFieldName}
								className={classNameLabel}
								disabled={disable}
							>
								{label}
							</FormLabel>
						</>
					</FormControl>
				</FormItem>
			)}
		/>
	);
}
