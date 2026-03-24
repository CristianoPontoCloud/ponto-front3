import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import SelectStatusForm from "@/view/components/formfields/select-status-form";
import { SheetMenuLayout } from "@/view/components/sheet/sheet-menu-layout";
import { Button } from "@/view/components/ui/button";
import { Trash } from "lucide-react";
import useTurnsLayoutSheet from "./use-turns-layout-sheet-form";

export function TurnsLayoutSheetForm(params: SheetFormProps) {
	const { currentForm, setCurrentForm, menuItems, methods, openModalExcludeTurn, id, onSubmit } =
		useTurnsLayoutSheet(params);
	function LeftChild() {
		return (
			<div className="flex gap-2">
				{id && (
					<Button
						variant="outline"
						size="icon"
						type="button"
						onClick={() => openModalExcludeTurn()}
					>
						<Trash className="text-red-500" />
					</Button>
				)}
				<SelectStatusForm
					formFieldName="status"
					form={methods}
					classNames={{
						formItem: "w-fit",
					}}
				/>
			</div>
		);
	}
	return (
		<SheetMenuLayout
			{...{
				currentForm,
				form: methods,
				onSubmit,
				sheetMenu: {
					menuItems,
					currentFormId: currentForm.id,
					setFormForRender: setCurrentForm,
				},
				onCancel: params.closeSheet,
				FooterLeftChild: <LeftChild />,
			}}
		/>
	);
}
