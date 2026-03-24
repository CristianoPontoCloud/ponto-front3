import { collaboratorsFacadeFactory } from "@/application/factories/collaborator/collaborators-facade-factory";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { collaboratorEditHourBankSchema } from "@/application/validation/forms/collaborators/collaborator-edit-hour-bank-schema";
import type { CollaboratorDetails } from "@/domain/entities/collaborator/collaborator";
import type { CollaboratorEditHourBankFormProps } from "@/domain/entities/collaborator/collaborator-edit-hour-bank";
import { dateSubmited } from "@/view/components/toaster/date-submited";
import { toastController } from "@/view/components/toaster/toast-controller";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

interface UseFormCollaboratorEditHourBankParams {
	collaboratorId: string;
	getSubmitResponse?: (data: CollaboratorDetails["hourBanks"]) => void;
}

export function useFormCollaboratorEditHourBank({
	collaboratorId,
	getSubmitResponse,
}: UseFormCollaboratorEditHourBankParams) {
	const { resetModal } = useModal();
	const token = useSession().data?.user.token ?? "";
	const form = useForm<CollaboratorEditHourBankFormProps>({
		mode: "onSubmit",
		resolver: zodResolver(collaboratorEditHourBankSchema),
	});

	const collaboratorFacade = useMemo(() => collaboratorsFacadeFactory(token), [token]);

	async function onSubmit(data: CollaboratorEditHourBankFormProps) {
		function ToastComponent() {
			return (
				<div className="flex flex-col gap-1 w-fit">
					<span className="truncate">Banco de horas alterado com sucesso!</span>
					<span className="text-muted-foreground">{dateSubmited()}</span>
				</div>
			);
		}
		const response = await collaboratorFacade.updateWorkJourney({
			collaboratorId: collaboratorId,
			workJourneyId: data.hourBankId,
			workJourneyItem: "HOUR_BANK",
			workJourneyAction: "ADD",
		});
		const collaborator = await collaboratorFacade.findById(collaboratorId)
		if (getSubmitResponse) getSubmitResponse(collaborator?.hourBanks ?? [])
		toastController.custom({
			Component: <ToastComponent />,
			action: {
				label: "Desfazer",
				onClick: () => { },
			},
		});
		resetModal();
		if (getSubmitResponse) {
			getSubmitResponse(response?.hourBanks ?? []);
		}
	}
	return { form, onSubmit, resetModal };
}
