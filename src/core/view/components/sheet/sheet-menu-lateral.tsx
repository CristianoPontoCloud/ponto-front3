import type { SheetMenuItem, SheetMenuLateralParams } from "@/domain/components/sheet/sheet-menu-lateral";
import { Button } from "@/view/components/ui/button";
import { useFormContext } from "react-hook-form";
import { tv } from "tailwind-variants";



export default function SheetMenuLateral({
	menuItems,
	currentFormId,
	setFormForRender,
	classNames,
}: SheetMenuLateralParams) {
	const buttonVariant = tv({
		base: "border-none w-full justify-start mb-2 text-muted-foreground bg-transparent shadow-none hover:bg-primary hover:text-background",
		extend: `${classNames?.button ?? ""}`,
		variants: {
			status: {
				selected:
					"bg-primary/20 text-primary hover:bg-primary hover:text-background",
				error: "text-red-500",
			},
		},
	});

	const {
		formState: { errors },
	} = useFormContext();

	const hasErrors = (errorMapFields: SheetMenuItem["errorMapFields"]) => {
		return errorMapFields.some((field) => errors[field]);
	};

	function statusLi(
		idForm: number,
		errorMapFields: SheetMenuItem["errorMapFields"],
	) {
		if (currentFormId === idForm) return "selected";
		if (hasErrors(errorMapFields)) return "error";
	}

	return (
		<ul className={`pl-1 ${classNames?.ul}`}>
			{menuItems.map(({ Icon, errorMapFields, form, label }, index) => (
				<li key={index.toString()} className={classNames?.li}>
					<Button
						variant={"outline"}
						className={buttonVariant({
							status: statusLi(form.id, errorMapFields),
						})}
						onClick={() => setFormForRender(form)}
						data-testid={`menu-item-${label}`}
						type={"button"}
					>
						<Icon />
						{label}
					</Button>
				</li>
			))}
		</ul>
	);
}
