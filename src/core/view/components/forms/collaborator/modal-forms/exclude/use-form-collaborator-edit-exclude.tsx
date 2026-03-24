import { collaboratorsFacadeFactory } from "@/application/factories/collaborator/collaborators-facade-factory";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { useInvalidateQueryAndRefetch } from "@/application/usecases/use-invalidate-query-and-refetch";
import { collaboratorExcludeSchema } from "@/application/validation/forms/collaborators/collaborator-exclude-schema";
import type { CollaboratorExcludeFormProps } from "@/domain/entities/collaborator/collaborator-exclude";
import { dateSubmited } from "@/view/components/toaster/date-submited";
import { toastController } from "@/view/components/toaster/toast-controller";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

interface UseFormCollaboratorExcludeParams {
	collaboratorId: string;
}

export function useFormCollaboratorExclude({ collaboratorId }: UseFormCollaboratorExcludeParams) {
	const { resetModal } = useModal();
	const token = useSession().data?.user?.token ?? "";
	const form = useForm<CollaboratorExcludeFormProps>({
		mode: "onSubmit",
		resolver: zodResolver(collaboratorExcludeSchema),
	});
	const { invalidateQueryAndRefetch } = useInvalidateQueryAndRefetch("collaborator");

	async function onSubmit() {
		// async function onSubmit(data: CollaboratorExcludeFormProps) {
		await collaboratorsFacadeFactory(token).delete(collaboratorId);
		invalidateQueryAndRefetch();
		resetModal();
		function ToastComponent() {
			return (
				<div className="flex flex-col gap-1 w-fit">
					<span className="truncate">Colaborador excluído com sucesso!</span>
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
