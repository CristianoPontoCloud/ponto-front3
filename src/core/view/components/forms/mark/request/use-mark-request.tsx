import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { useContextSheetContentController } from "@/application/providers/sheet-content/sheet-component-provider";
import { timetrackingRquestsSchema } from "@/application/validation/forms/timetrackings/requests";
import {
	type MarkRequestFormProps,
	MarkRequestTypeEnum,
} from "@/domain/entities/marks/settings/mark-requests";
import { dateSubmited } from "@/view/components/toaster/date-submited";
import { toastController } from "@/view/components/toaster/toast-controller";
import { Button } from "@/view/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Settings } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

interface UseTimetrackingRequestParams {
	hasRecord?: boolean;
	date: Date;
	collaborator: {
		id: string;
		name: string;
		position: string;
	};
}

export function useMarkRequest({ date }: UseTimetrackingRequestParams) {
	const defaultRequest: MarkRequestFormProps = {
		requests: [
			{
				justify: "",
				type: MarkRequestTypeEnum.emergency,
				date: date,
				dtEnd: date,
				dtStart: date,
				hour: "",
				hrEnd: "",
				hrStart: "",
			},
		],
	};
	const { reset } = useContextSheetContentController();
	const { setModalAndOpen, resetModal } = useModal();

	const form = useForm<MarkRequestFormProps>({
		values: defaultRequest,
		resolver: zodResolver(timetrackingRquestsSchema),
		mode: "onSubmit",
	});
	const control = form.control;
	const { fields, remove, append } = useFieldArray({
		control,
		name: "requests",
	});

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
		toast("Ajuste removido com sucesso!", {
			description: dateSubmited(),
			className: "w-fit right-0",
		});
	}

	function Icon() {
		return (
			<>
				<div className="w-11 h-11 rounded-lg bg-blue-50 dark:bg-blue-900/10 flex justify-center items-center">
					<Settings className="text-blue-600 w-4 h-4" />
				</div>
				<div>
					<p className="font-semibold">Turno alterado!</p>
					<span className="text-muted-foreground truncate">{dateSubmited()}</span>
				</div>
			</>
		);
	}
	function createRequest() {
		append({ ...defaultRequest.requests[0] });
	}
	function saveAllFieldsInForm() {
		for (const f of fields) {
			const newRequests = [...form.watch("requests")];
			newRequests.push({ ...f });
			form.setValue("requests", newRequests);
		}
	}

	function onSubmit(data: MarkRequestFormProps) {
		saveAllFieldsInForm();
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
		fields,
		remove,
		createRequest,
	};
}
