import type { Option } from "@/domain/components/options";
import type { CollaboratorFormProps } from "@/domain/entities/collaborator/collaborator";
import { CollaboratorStatusEnum } from "@/domain/entities/collaborator/collaborator-status";
import { Trash } from "lucide-react";
import { useFormContext } from "react-hook-form";
import type { CollaboratorViewerParams } from "../../entities/collaborator/collaborator-viewer";
import { Options } from "../../options/options";
import { Button } from "../../ui/button";
import { useCollaboratorOpenModaForms } from "./modal-forms/use-collaborator-open-modal-forms";

interface CollaboratorSheetFormOptionParams {
	collaborator: CollaboratorFormProps;
}

export function CollaboratorSheetFormOption({ collaborator }: CollaboratorSheetFormOptionParams) {
	const form = useFormContext<CollaboratorFormProps>();
	const openModalForm = useCollaboratorOpenModaForms();
	const status = form.watch("status");
	const isDismiss = status === CollaboratorStatusEnum.dismissed;
	// const { setOpen } = useSheet();
	const collaboratorId = collaborator.id ?? "";
	const collaboratorViewer: CollaboratorViewerParams = {
		name: collaborator.name,
		position: collaborator.position,
		src: collaborator.imageUrl,
	};

	const optionsConfig = (): Option[] => {
		return [
			{
				label: "Demitir",
				onClick: () =>
					openModalForm.dismissal({
						collaboratorId,
						collaboratorViewer,
						getSubmitResponse: () => {
							form.setValue("status", CollaboratorStatusEnum.dismissed);
						},
					}),
				hasSeparator: true,
			},
			{
				label: "Excluir",
				onClick: () =>
					openModalForm.exclude({
						collaboratorViewer,
						collaboratorId,
						// getSubmitResponse: () => {
						// 	setOpen(false);
						// },
					}),
				className: "text-red-500 focus:bg-red-500 focus:text-background !important",
			},
		];
	};

	if (isDismiss) {
		return (
			<>
				<Button
					variant="outline"
					size="icon"
					type="button"
					onClick={() =>
						openModalForm.exclude({
							collaboratorId,
							collaboratorViewer,
						})
					}
				>
					<Trash className="text-red-500" />
				</Button>
				<Button
					variant="outline"
					type="button"
					onClick={() => form.setValue("status", CollaboratorStatusEnum.active)}
				>
					Readmitir
				</Button>
			</>
		);
	}

	return (
		<Options
			options={optionsConfig()}
			label="Ações"
			buttonTrigger={{
				className: "h-9 w-9 border border-muted",
			}}
		/>
	);
}
