import { getValueByPath } from "@/domain/components/formfields/get-value-by-path";
import type { SearchFormParams } from "@/domain/components/formfields/search-form-field";
import { FormControl, FormField, FormItem } from "@/view/components/ui/form";
import { Input } from "@/view/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import { tv } from "tailwind-variants";

export function SearchForm<T extends FieldValues>({
	formFieldName,
	form,
	classNames,
	maxLength = 50,
	type,
	min,
	max,
	minLength,
	disabled = false,
}: SearchFormParams<T>) {
	const value = form.watch(formFieldName);
	const [hasValue, setHasValue] = useState<boolean>(
		value !== "" && value !== undefined && value !== null,
	);
	const error = getValueByPath(form.formState.errors, formFieldName);
	const hasError = !!error?.message;
	const inputVariants = tv({
		base: classNames?.formItem,
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
					<FormControl>
						<div className="flex gap-1 items-center h-9 relative">
							<Input
								id={formFieldName}
								data-testid={`input-${formFieldName}`}
								{...field}
								ref={field?.ref}
								maxLength={maxLength}
								type={type}
								minLength={minLength}
								min={min}
								max={max}
								onChange={(e) => {
									if (e.target.value !== "") {
										setHasValue(true);
									}
									if (e.target.value === "") {
										setHasValue(false);
									}
									field.onChange(e.target.value);
								}}
								value={field.value || ""}
								className={inputVariants({ hasError })}
								disabled={disabled}
							/>
							{!hasValue && (
								// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
								<label
									className="absolute left-3 text-muted-foreground flex items-center gap-1 dark:text-white"
									htmlFor={formFieldName}
									id="placeholder"
								>
									<Search className="w-5 h-5 dark:text-white" /> Buscar
								</label>
							)}
						</div>
					</FormControl>
				</FormItem>
			)}
		/>
	);
}
