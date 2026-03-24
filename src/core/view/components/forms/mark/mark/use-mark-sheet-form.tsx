import { dailySlotFacadeFactory } from "@/application/factories/daily-slot";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { useContextSheetContentController } from "@/application/providers/sheet-content/sheet-component-provider";
import { timetrackingMarkSchema } from "@/application/validation/forms/timetrackings/mark";
import type { MarkFormProps } from "@/domain/entities/marks/desconsider-marks";
import { MarkStatusEnum, type MarkType } from "@/domain/entities/marks/marks";
import { dateSubmited } from "@/view/components/toaster/date-submited";
import { toastError } from "@/view/components/toaster/toast-error";
import { Button } from "@/view/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMarkSubmitCases } from "./use-mark-submit-cases";

interface useMarkSheetFormParams {
	idMark?: string;
	punchClockId?: string;
	values: MarkFormProps;
	type: MarkType;
	status?: MarkStatusEnum;
	refetchGridValues: () => void;
}

export function useMarkSheetForm({
	values,
	type,
	idMark,
	punchClockId,
	refetchGridValues,
	status,
}: useMarkSheetFormParams) {
	const { reset } = useContextSheetContentController();
	const { setModalAndOpen, resetModal } = useModal();
	const form = useForm<MarkFormProps>({
		values: values,
		resolver: zodResolver(timetrackingMarkSchema),
		mode: "onSubmit",
	});
	const token = useSession().data?.user.token ?? "";
	const dailySlotFacade = useMemo(() => dailySlotFacadeFactory(token), [token]);
	const { handleSubmit } = form;
	const { submitUseCase } = useMarkSubmitCases({
		form,
		collaborator: values.collaborator,
		idMark,
		punchClockId,
		type,
		refetchGridValues,
	});

	function openModalUndoMark() {
		setModalAndOpen({
			title: "Atenção!",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
			content: (
				<div className="w-full flex justify-end gap-2">
					<Button className="bg-red-600 text-white" onClick={() => modalConfirmUndoMark()}>
						Confirmar
					</Button>
					<Button variant="outline">Cancelar</Button>
				</div>
			),
		});
	}

	async function modalConfirmUndoMark() {
		const { manual, normal, dayoff, dent, med, missing } = MarkStatusEnum;
		const breakCase =
			!idMark ||
			!status ||
			status === dayoff ||
			status === dent ||
			status === med ||
			status === missing;
		if (breakCase) return;
		const confirmUndOMarkCases = {
			[manual]: async () => {
				await dailySlotFacade.ignore({
					slotId: idMark,
					body: { reason: "ignored slot for user ignored slot for user" },
				});
				toast("Marcação excluida com sucesso", {
					description: dateSubmited(),
					className: "w-fit right-0",
				});
			},
			[normal]: async () => {
				await dailySlotFacade.ignore({
					slotId: idMark,
					body: { reason: "ignored slot for user ignored slot for user" },
				});
				toast("Marcação desconsiderada com sucesso", {
					description: dateSubmited(),
					className: "w-fit right-0",
				});
			},
		};
		try {
			await confirmUndOMarkCases[status]();
			reset();
			resetModal();
			refetchGridValues();
		} catch {
			toastError({ tittle: "Error" });
		}
	}

	async function onSubmit(data: MarkFormProps) {
		await submitUseCase(data);
	}

	return {
		form,
		handleSubmit,
		onSubmit,
		openModalUndoMark,
	};
}
