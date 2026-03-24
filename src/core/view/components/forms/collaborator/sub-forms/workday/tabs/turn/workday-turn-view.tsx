import { collaboratorWorkShiftFacadeFactory } from "@/application/factories/collaborator/collaborator-work-shift-factory";
import { collaboratorsFacadeFactory } from "@/application/factories/collaborator/collaborators-facade-factory";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import type { CollaboratorFormProps } from "@/domain/entities/collaborator/collaborator";
import { dateSubmited } from "@/view/components/toaster/date-submited";
import { toastController } from "@/view/components/toaster/toast-controller";
import { toastError } from "@/view/components/toaster/toast-error";
import { DashedSeparator } from "@/view/components/ui/dashed-separator";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { WorkdayTurnList } from "./worday-turn-list";
import { WorkdayTurnForm } from "./workday-turn-form";

export function WorkdayTurnView() {
	const form = useFormContext<CollaboratorFormProps>();
	const turns = form.watch("workShiftAssignments");
	const { resetModal } = useModal();
	const id = form.watch("id") ?? "";
	const token = useSession().data?.user?.token ?? "";
	const facades = useMemo(() => ({ collaboratorWorkShift: collaboratorWorkShiftFacadeFactory(token), collaborator: collaboratorsFacadeFactory(token) }), [token])
	async function excludeLastTurn(assignmentId: string) {
		function ToastComponent() {
			return (
				<div className="flex flex-col gap-1 w-fit">
					<span className="truncate">Turno excluído com sucesso!</span>
					<span className="text-muted-foreground">{dateSubmited()}</span>
				</div>
			);
		}
		try {
			await facades.collaboratorWorkShift.delete(assignmentId);
			const response = await facades.collaborator.findById(id)
			form.setValue("workShiftAssignments", response?.workShiftAssignments ?? []);
			resetModal();
			toastController.custom({
				Component: <ToastComponent />,
				action: {
					label: "Desfazer",
					onClick: () => { },
				},
			});
		} catch {
			toastError({ tittle: "Erro de servidor" })
		}
	}

	return (
		<div className="flex flex-col gap-4">
			<DashedSeparator className="col-span-2" />
			{id && <WorkdayTurnList {...{ turns, excludeLastTurn }} />}
			{!id && <WorkdayTurnForm />}
		</div>
	);
}
