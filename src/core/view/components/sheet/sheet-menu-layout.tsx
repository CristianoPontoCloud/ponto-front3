import type {
	SheetMenuItem,
	SheetMenuLateralParams,
} from "@/domain/components/sheet/sheet-menu-lateral";
import type { ElementType, ReactNode } from "react";
import { type FieldValues, useFormContext } from "react-hook-form";
import { SheetFooterSubmit } from "./sheet-footer-submit";
import SheetMenuLateral from "./sheet-menu-lateral";
interface SheetMenuLayoutParams<T extends FieldValues> {
	sheetMenu: SheetMenuLateralParams;
	currentForm: SheetMenuItem["form"];
	TopListGerenericComponent?: ElementType;
	onSubmit: (data: T) => Promise<void>;
	hasFooterSeparator?: boolean;
	sheetHasDescription?: boolean;
	onCancel?: VoidFunction;
	FooterLeftChild?: ReactNode;
}

export function SheetMenuLayout<T extends FieldValues>({
	sheetMenu,
	TopListGerenericComponent,
	currentForm,
	onSubmit,
	sheetHasDescription,
	hasFooterSeparator,
	onCancel,
	FooterLeftChild,
}: SheetMenuLayoutParams<T>) {
	const form = useFormContext<T>();
	return (
		// <FormProvider {...form}>
		<form
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit(onSubmit)(e);
			}}
			id="form-sheet-menu-layout"
		>
			<div className="flex w-full max-h-full">
				<div className="flex max-h-full flex-col items-center mb-2 pr-2 relative">
					{TopListGerenericComponent && <TopListGerenericComponent />}
					<SheetMenuLateral
						{...sheetMenu}
						classNames={{ ul: TopListGerenericComponent ? "mt-4" : "" }}
					/>
				</div>
				<currentForm.FormComponent />
			</div>
			<SheetFooterSubmit
				onCancel={onCancel}
				hasSeparator={hasFooterSeparator}
				sheetHasDescription={sheetHasDescription}
				LeftChild={FooterLeftChild}
			/>
		</form>
		// </FormProvider>
	);
}
