import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { collaboratorEditDismissalSchema } from "@/application/validation/forms/collaborators/collaborator-edit-dismissal-schema";
import type { CollaboratorEditDismissalFormProps } from "@/domain/entities/collaborator/collaborator-edit-dismissal";
import { dateSubmited } from "@/view/components/toaster/date-submited";
import { toastController } from "@/view/components/toaster/toast-controller";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface UseFormCollaboratorEditDismissalParams {
	collaboratorId: string;
	getSubmitResponse?: (data: CollaboratorEditDismissalFormProps) => void;
}

export function useFormCollaboratorEditDismissal({
	// collaboratorId,
	getSubmitResponse,
}: UseFormCollaboratorEditDismissalParams) {
	const { resetModal } = useModal();
	const form = useForm<CollaboratorEditDismissalFormProps>({
		mode: "onSubmit",
		resolver: zodResolver(collaboratorEditDismissalSchema),
	});

	async function onSubmit(data: CollaboratorEditDismissalFormProps) {
		if (getSubmitResponse) {
			getSubmitResponse(data);
		}
		resetModal();
		function ToastComponent() {
			return (
				<div className="flex flex-col gap-1 w-fit">
					<span className="truncate">Colaborador demitido com sucesso!</span>
					<span className="text-muted-foreground">{dateSubmited()}</span>
				</div>
			);
		}
		toastController.custom({
			Component: <ToastComponent />,
			action: {
				label: "Desfazer",
				onClick: () => {},
			},
		});
	}
	return { form, onSubmit, resetModal };
}
