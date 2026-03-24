import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import { Trash } from "lucide-react";
import SelectStatusForm from "../../formfields/select-status-form";
import { SheetMenuLayout } from "../../sheet/sheet-menu-layout";
import { Button } from "../../ui/button";
import useCompaniesLayoutSheet from "./use-companies-layout-sheet-form";

export function CompaniesLayoutSheetForm(params: SheetFormProps) {
	const { currentForm, setCurrentForm, menuItems, methods, onSubmit, id, openModalExlcudeCompany } =
		useCompaniesLayoutSheet(params);

	function LeftChild() {
		return (
			<div className="flex gap-2">
				{id && (
					<Button
						variant="outline"
						size="icon"
						type="button"
						onClick={() => openModalExlcudeCompany()}
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
