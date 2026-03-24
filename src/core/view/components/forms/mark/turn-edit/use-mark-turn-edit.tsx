import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { useContextSheetContentController } from "@/application/providers/sheet-content/sheet-component-provider";
import { timetrackingTurnEditSchema } from "@/application/validation/forms/timetrackings/turn-edit";
import type { CollaboratorEditTurnFormProps } from "@/domain/entities/collaborator/collaborator-edit-turn";
import {
	MarkTurnEditTypeDateChangeEnum
} from "@/domain/entities/marks/settings/mark-edit-turn";

import { dateSubmited } from "@/view/components/toaster/date-submited";
import { toastController } from "@/view/components/toaster/toast-controller";
import { Button } from "@/view/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Settings } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface useMarkTurnEdiParams {
	hasRecord?: boolean;
	values: CollaboratorEditTurnFormProps;
	collaborator: {
		id: string;
		name: string;
		position: string;
	};
}
export function useMarkTurnEdit({ values }: useMarkTurnEdiParams) {
	const { reset } = useContextSheetContentController();
	const { setModalAndOpen, resetModal } = useModal();
	const form = useForm<CollaboratorEditTurnFormProps>({
		values: values,
		resolver: zodResolver(timetrackingTurnEditSchema),
		mode: "onSubmit",
	});
	const [turnEditType, setTurnEditType] = useState<MarkTurnEditTypeDateChangeEnum>(MarkTurnEditTypeDateChangeEnum.specificDays)
	function openModalUndoMark() {
		setModalAndOpen({
			title: "Remover ajuste!",
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

	function modalConfirmUndoMark() {
		reset();
		resetModal();
		function Toast() {
			return (
				<div className="flex gap-4 items-center">
					<div>
						<p className="font-semibold">Ajuste removido com sucesso!</p>
						<p className="text-xs">{dateSubmited()}</p>
					</div>
					<Button variant="secondary" type="button">
						Refazer
					</Button>
				</div>
			);
		}
		toastController.custom({
			Component: <Toast />,
		});
	}

	const typeDateLabel = {
		[MarkTurnEditTypeDateChangeEnum.specificDays]: "específico em ",
		[MarkTurnEditTypeDateChangeEnum.startingFromDay]: "a partir de ",
	};
	const typeDateToastLabel = typeDateLabel[turnEditType];
	const date = format(form.watch("startDate") ?? new Date(), "dd/MM/yyyy");
	function Icon() {
		return (
			<>
				<div className="w-11 h-11 rounded-lg bg-blue-50 dark:bg-blue-900/10 flex justify-center items-center">
					<Settings className="text-blue-600 w-4 h-4" />
				</div>
				<div>
					<p className="font-semibold">Turno alterado</p>
					<span className="text-muted-foreground truncate">
						Nome do turno - {typeDateToastLabel} {date}
					</span>
				</div>
			</>
		);
	}

	async function onSubmit(data: CollaboratorEditTurnFormProps) {
		reset();

		toastController.custom({
			Component: <Icon />,
			action: {
				label: "Desfazer",
				onClick: () => { },
			},
		});
		console.log("Dados enviados:", data);
	}
	return {
		form,
		openModalUndoMark,
		onSubmit,
		turnEditType,
		setTurnEditType
	};
}
