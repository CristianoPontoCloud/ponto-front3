import { collaboratorExtraTimeFacadeFactory } from "@/application/factories/collaborator/collaborator-extra-time-factory";
import { collaboratorsFacadeFactory } from "@/application/factories/collaborator/collaborators-facade-factory";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { collaboratorEditExtraHourSchema } from "@/application/validation/forms/collaborators/collaborator-edit-extra-hour-schema";
import type { CollaboratorDetails } from "@/domain/entities/collaborator/collaborator";
import type { CollaboratorEditExtraHourFormProps } from "@/domain/entities/collaborator/collaborator-edit-extra-hour";
import { dateSubmited } from "@/view/components/toaster/date-submited";
import { toastController } from "@/view/components/toaster/toast-controller";
import { toastError } from "@/view/components/toaster/toast-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { addYears } from "date-fns";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

interface UseFormCollaboratorEditExtraHourParams {
	collaboratorId: string;
	getSubmitResponse?: (data: CollaboratorDetails["extraHours"]) => void;
}

export function useFormCollaboratorEditExtraHour({
	collaboratorId,
	getSubmitResponse,
}: UseFormCollaboratorEditExtraHourParams) {
	const { resetModal } = useModal();
	const token = useSession().data?.user.token ?? "";
	const form = useForm<CollaboratorEditExtraHourFormProps>({
		mode: "onSubmit",
		resolver: zodResolver(collaboratorEditExtraHourSchema),
	});

	const facades = useMemo(
		() => ({
			collaboratorExtraTime: collaboratorExtraTimeFacadeFactory(token),
			collaborator: collaboratorsFacadeFactory(token)
		}),
		[token]
	);

	async function onSubmit({
		startDate,
		extraHourId,
		observation,
	}: CollaboratorEditExtraHourFormProps) {
		function ToastComponent() {
			return (
				<div className="flex flex-col gap-1 w-fit">
					<span className="truncate">Hora extra alterado com sucesso!</span>
					<span className="text-muted-foreground">{dateSubmited()}</span>
				</div>
			);
		}
		try {
			const endDate = addYears(startDate as Date, 100)
			await facades.collaboratorExtraTime.create({
				collaboratorId,
				endDate,
				startDate: startDate,
				extraTimeId: extraHourId,
				obs: observation,
			});
			const collaborator = await facades.collaborator.findById(collaboratorId)
			if (getSubmitResponse) getSubmitResponse(collaborator?.extraHours ?? [])
			resetModal();
			toastController.custom({
				Component: <ToastComponent />,
				action: {
					label: "Desfazer",
					onClick: () => { },
				},
			});
		} catch {
			toastError({
				tittle: "Erro de servidor"
			})
		}


	}
	return { form, onSubmit, resetModal };
}
