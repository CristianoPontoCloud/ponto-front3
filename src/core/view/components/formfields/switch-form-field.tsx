import type { SwitchFormParams } from "@/domain/components/formfields/switch-form-field";
import type { FieldValues } from "react-hook-form";
import { tv } from "tailwind-variants";
import { FormControl, FormField, FormItem } from "../ui/form";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

export function SwitchForm<T extends FieldValues>({
	form,
	formFieldName,
	label,
	className,
	classNameLabel,
	disabled = false,
}: SwitchFormParams<T>) {
	const wrapperStyle = tv({
		base: "flex items-center gap-2",
		extend: className,
	});

	return (
		<FormField
			control={form.control}
			name={formFieldName}
			render={({ field }) => (
				<FormItem className={className}>
					<FormControl>
						<div className={wrapperStyle()}>
							<Switch
								id={formFieldName}
								checked={field.value}
								onCheckedChange={field.onChange}
								className="data-[state=checked]:bg-primary"
								disabled={disabled}
								aria-disabled={disabled}
								data-testid={`switch-${formFieldName}`}
							/>
							{label && (
								<Label
									htmlFor={formFieldName}
									data-testid={`label-${formFieldName}`}
									className={classNameLabel}
								>
									{label}
								</Label>
							)}
						</div>
					</FormControl>
				</FormItem>
			)}
		/>
	);
}
