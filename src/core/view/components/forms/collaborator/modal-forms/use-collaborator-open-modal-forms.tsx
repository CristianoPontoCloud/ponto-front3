import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { FormCollaboratorEditDismissal } from "@/view/components/forms/collaborator/modal-forms/dismissal/form-collaborator-edit-dismissal";
import { FormCollaboratorEditExtraHour } from "@/view/components/forms/collaborator/modal-forms/extra-hour/form-collaborator-edit-extra-hour";
import { FormCollaboratorEditHourBank } from "@/view/components/forms/collaborator/modal-forms/hour-bank/form-collaborator-edit-hour-bank";
import { FormCollaboratorEditTurn } from "@/view/components/forms/collaborator/modal-forms/turn/form-collaborator-edit-turn";
import { FormCollaboratorExclude } from "./exclude/form-collaborator-edit-exclude";

type OpenTurnParams = FormCollaboratorEditTurn;
type OpenDismissalParams = FormCollaboratorEditDismissal;
type OpenExtraHourParams = FormCollaboratorEditExtraHour;
type OpenHourBankParams = FormCollaboratorEditHourBank;
type OpenExcludeCollaboratorParams = FormCollaboratorExclude;

export function useCollaboratorOpenModaForms() {
	const { setModalAndOpen } = useModal();

	function turn({ collaboratorViewer, getSubmitResponse, collaboratorId }: OpenTurnParams) {
		setModalAndOpen({
			title: "Alterar turno",
			content: (
				<FormCollaboratorEditTurn
					collaboratorId={collaboratorId}
					getSubmitResponse={getSubmitResponse}
					collaboratorViewer={collaboratorViewer}
				/>
			),
		});
	}
	function dismissal({
		collaboratorViewer,
		getSubmitResponse,
		collaboratorId,
	}: OpenDismissalParams) {
		setModalAndOpen({
			title: "Demitir colaborador",
			content: (
				<FormCollaboratorEditDismissal
					collaboratorId={collaboratorId}
					getSubmitResponse={getSubmitResponse}
					collaboratorViewer={collaboratorViewer}
				/>
			),
		});
	}
	function extraHour({
		collaboratorViewer,
		getSubmitResponse,
		collaboratorId,
	}: OpenExtraHourParams) {
		setModalAndOpen({
			title: "Alterar hora extra",
			content: (
				<FormCollaboratorEditExtraHour
					collaboratorId={collaboratorId}
					getSubmitResponse={getSubmitResponse}
					collaboratorViewer={collaboratorViewer}
				/>
			),
		});
	}
	function hourBank({ collaboratorViewer, getSubmitResponse, collaboratorId }: OpenHourBankParams) {
		setModalAndOpen({
			title: "Alterar banco de horas",
			content: (
				<FormCollaboratorEditHourBank
					collaboratorId={collaboratorId}
					getSubmitResponse={getSubmitResponse}
					collaboratorViewer={collaboratorViewer}
				/>
			),
		});
	}
	function exclude({ collaboratorViewer, collaboratorId }: OpenExcludeCollaboratorParams) {
		setModalAndOpen({
			title: "Alterar banco de horas",
			content: (
				<FormCollaboratorExclude
					collaboratorId={collaboratorId}
					collaboratorViewer={collaboratorViewer}
				/>
			),
		});
	}
	return {
		turn,
		dismissal,
		extraHour,
		hourBank,
		exclude,
	};
}
