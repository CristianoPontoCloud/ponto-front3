import { collaboratorsFacadeFactory } from "@/application/factories/collaborator/collaborators-facade-factory";
import { useSheet } from "@/application/providers/sheet-provider/sheet-provider";
import {
	type ChangeStatusDispatcherFacadeFactory,
	changeStatusDispatcher,
} from "@/application/usecases/change-status-dispatcher";
import { useInvalidateQueryAndRefetch } from "@/application/usecases/use-invalidate-query-and-refetch";
import type { Option } from "@/domain/components/options";
import type {
	Collaborator,
	CollaboratorDetails,
	CollaboratorFormProps,
} from "@/domain/entities/collaborator/collaborator";
import {
	CollaboratorStatusEnum,
	getCollaboratorStatus,
} from "@/domain/entities/collaborator/collaborator-status";
import type { StatusDefaultEnum } from "@/domain/usecases/status-default";
import { useSession } from "next-auth/react";
import { type Dispatch, type SetStateAction, useMemo } from "react";
import { useCollaboratorOpenModaForms } from "../../components/forms/collaborator/modal-forms/use-collaborator-open-modal-forms";
import { Options } from "../../components/options/options";

interface CollaboratorOptionParams {
	setFormValues: Dispatch<SetStateAction<CollaboratorFormProps>>;
	collaborator: Collaborator;
}

export function CollaboratorPageOption({ setFormValues, collaborator }: CollaboratorOptionParams) {
	const openModalForm = useCollaboratorOpenModaForms();
	const session = useSession();
	const token = session.data?.user.token ?? "";
	const companyId = session.data?.user.companyId ?? "";

	const collaboratorFacade = useMemo(() => collaboratorsFacadeFactory(token), [token]);
	const { invalidateQueryAndRefetch } = useInvalidateQueryAndRefetch("collaborator");
	const { setOpen } = useSheet();

	function isDismiss(status: Collaborator["status"]) {
		return status === CollaboratorStatusEnum.dismissed.toString();
	}

	async function editCollaborator(collaboratorId: string) {
		async function getCollaboratorFormValues() {
			const form = await collaboratorFacade.findById(collaboratorId);
			if (!form) return;
			setFormValues({
				...form,
				company: form.company?.id ?? "",
				department: form.department?.id ?? "",
				position: form.position?.id ?? "",
			});
		}
		await getCollaboratorFormValues();
		setOpen(true);
	}

	const optionsConfig = (collaborator: Collaborator): Option[] => {
		const { status } = collaborator;

		const dimissOption: Option = {
			label: "Demitir",
			onClick: () => openModalForm.dismissal({ collaboratorViewer, collaboratorId }),
			hasSeparator: true,
		};
		const rehireOption: Option = {
			label: "Readimitir",
			onClick: () => { },
			hasSeparator: true,
		};

		const currentStatus = getCollaboratorStatus(status);
		const changeStatusLabel =
			currentStatus.value === CollaboratorStatusEnum.active ? "Inativar" : "Ativar";

		const dismissRehireOption = isDismiss(status) ? rehireOption : dimissOption;
		const collaboratorViewer = {
			name: collaborator.name,
			position: collaborator.position?.name ?? "",
			src: collaborator.imageUrl,
		};
		const collaboratorId = collaborator.id;
		return [
			{
				label: "Gerenciar",
				onClick: () => editCollaborator(collaborator.id),
			},
			{
				label: changeStatusLabel,
				onClick: async () => {
					await changeStatusDispatcher<CollaboratorDetails>({
						entity: "colaborador",
						status: collaborator.status as unknown as StatusDefaultEnum,
						facadeFactorie:
							collaboratorFacade as unknown as ChangeStatusDispatcherFacadeFactory<CollaboratorDetails>,
						id: collaborator.id,
						finallyFn: async () => await invalidateQueryAndRefetch(),
						companyId,
					});
				},
				hasSeparator: true,
			},
			{
				...dismissRehireOption,
			},
			{
				label: "Alterar turno",
				onClick: () => openModalForm.turn({ collaboratorViewer, collaboratorId }),
			},
			{
				label: "Alterar hora extra",
				onClick: () => openModalForm.extraHour({ collaboratorViewer, collaboratorId }),
			},
			{
				label: "Alterar banco de horas",
				onClick: () => openModalForm.hourBank({ collaboratorViewer, collaboratorId }),
				hasSeparator: true,
			},
			{
				label: "Excluir",
				onClick: () => openModalForm.exclude({ collaboratorViewer, collaboratorId }),
				className: "text-red-500 focus:bg-red-500 focus:text-background !important",
			},
		];
	};

	return <Options options={optionsConfig(collaborator)} label="Ações" />;
}
