import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import type { CollaboratorFormProps } from "@/domain/entities/collaborator/collaborator";
import { CollaboratorStatusEnum } from "@/domain/entities/collaborator/collaborator-status";
import { useFormContext } from "react-hook-form";
import { CollaboratorPhotoUploader } from "../../entities/collaborator/collaborator-upload-photo";
import SelectStatusForm from "../../formfields/select-status-form";
import { SwitchForm } from "../../formfields/switch-form-field";
import { SheetMenuLayout } from "../../sheet/sheet-menu-layout";
import { CollaboratorSheetFormOption } from "./collaborator-sheet-form-options";
import useCollaboratorLayoutSheet from "./use-collaborator-layout-sheet-form";

export default function CollaboratorLayoutSheetForm(params: SheetFormProps) {
	const form = useFormContext<CollaboratorFormProps>();
	const status = form.watch("status");
	const isDismiss = status === CollaboratorStatusEnum.dismissed;
	const { currentForm, setCurrentForm, methods, onSubmit, menuItems } =
		useCollaboratorLayoutSheet(params);
	const collaborator = form.watch();

	function FooterComponents() {
		return (
			<div className="min-w-[187px] flex gap-2 items-center relative">
				<div className="w-full border p-4 rounded-md flex flex-col gap-4 absolute top-[-132px] bg-gradient-to-tl from-primary from-0% via-primary/5 via-0% to-transparent to-40% to-transparent">
					<SwitchForm form={form} formFieldName="registerMark" label="Registrar ponto" />
					<span className="text-xm text-muted-foreground ">
						Se ativo, este usuário poderá realizar o registro de ponto.
					</span>
				</div>
				{collaborator.id && <CollaboratorSheetFormOption collaborator={collaborator} />}
				{!isDismiss && (
					<SelectStatusForm
						formFieldName="status"
						form={form}
						classNames={{
							formItem: "w-full",
						}}
					/>
				)}
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
				sheetHasDescription: true,
				TopListGerenericComponent: CollaboratorPhotoUploader,
				onCancel: params.closeSheet,
				FooterLeftChild: <FooterComponents />,
			}}
		/>
	);
}
