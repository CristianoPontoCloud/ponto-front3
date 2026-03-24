import { collaboratorWorkShiftFacadeFactory } from "@/application/factories/collaborator/collaborator-work-shift-factory";
import { collaboratorsFacadeFactory } from "@/application/factories/collaborator/collaborators-facade-factory";
import { turnsFacadeFactory } from "@/application/factories/hours/turns-facade-factory";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { collaboratorEditTurnSchema } from "@/application/validation/forms/collaborators/collaborator-edit-turn-schema";
import type { WorkShiftAssignment } from "@/domain/entities/collaborator/collaborator";
import type { CollaboratorEditTurnFormProps } from "@/domain/entities/collaborator/collaborator-edit-turn";
import type { ValueLabel } from "@/domain/value-label";
import { dateSubmited } from "@/view/components/toaster/date-submited";
import { toastController } from "@/view/components/toaster/toast-controller";
import { toastError } from "@/view/components/toaster/toast-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { addYears } from "date-fns";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

interface UseFormCollaboratorEditTurnParams {
	collaboratorId: string;
	getSubmitResponse?: (data: WorkShiftAssignment[]) => void;
}

export function useFormCollaboratorEditTurn({
	collaboratorId,
	getSubmitResponse,
}: UseFormCollaboratorEditTurnParams) {
	const { resetModal } = useModal();
	const token = useSession().data?.user.token ?? "";
	const form = useForm<CollaboratorEditTurnFormProps>({
		mode: "onSubmit",
		resolver: zodResolver(collaboratorEditTurnSchema),
	});
	const facades = useMemo(() => ({
		collaboratorWorkshift: collaboratorWorkShiftFacadeFactory(token),
		collaborator: collaboratorsFacadeFactory(token)
	}), [token]);

	async function onSubmit({
		startDate,
		observation,
		positionCycle,
		turnId,
	}: CollaboratorEditTurnFormProps) {
		function ToastComponent() {
			return (
				<div className="flex flex-col gap-1 w-fit">
					<span className="truncate">Turno alterado com sucesso!</span>
					<span className="text-muted-foreground">{dateSubmited()}</span>
				</div>
			);
		}
		try {
			const endDate = addYears(startDate, 100)
			await facades.collaboratorWorkshift.create({
				workShiftId: turnId,
				obs: observation,
				cycleOffset: positionCycle,
				isTemporary: false,
				collaboratorId,
				endDate,
				startDate,
			})
			const collaborator = await facades.collaborator.findById(collaboratorId)
			if (getSubmitResponse) getSubmitResponse(collaborator?.workShiftAssignments ?? [])
			toastController.custom({
				Component: <ToastComponent />,
				action: {
					label: "Desfazer",
					onClick: () => { },
				},
			});
			resetModal();
		} catch {
			toastError({
				tittle: "Erro de servidor"
			})
		}
	}

	const turnId = form.watch("turnId") ?? "";
	const turnsFacade = useMemo(() => turnsFacadeFactory(token), [token]);
	const [cycleDaysData, setCycleDaysData] = useState<ValueLabel[]>([]);
	const { refetch } = useQuery({
		queryKey: ["turn", turnId],
		queryFn: async () => {
			const turn = await turnsFacade.findById(turnId);
			const cycleLengthDays = turn?.policy.cycleLengthDays
				? Number(turn?.policy.cycleLengthDays)
				: 0;
			const cycleLengthDaysValues: ValueLabel[] = Array.from({ length: cycleLengthDays }).map(
				(_, index) => {
					const day = (index + 1).toString();
					return {
						value: day.toString(),
						label: day.toString(),
					};
				},
			);
			console.log({ cycleLengthDaysValues, turn })
			setCycleDaysData(cycleLengthDaysValues);
		},
		retry: false,
		enabled: false,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		// staleTime: Number.POSITIVE_INFINITY,
	});

	useEffect(() => {
		async function getTurn() {
			// if (turnId !== "") {
			// }
			await refetch();
		}
		getTurn();
	}, [turnId, refetch]);

	return { form, onSubmit, resetModal, cycleDaysData };
}
