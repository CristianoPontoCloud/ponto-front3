import { hourBankEntryFacadeFactory } from "@/application/factories/hours/hour-bank-entry-facade-factory";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { useContextSheetContentController } from "@/application/providers/sheet-content/sheet-component-provider";
import { timetrackingHourBankSchema } from "@/application/validation/forms/timetrackings/hour-bank";
import {
	type MarkHourBankEntryBulkFormProps,
	MarkHourBankEntryTypeEnum
} from "@/domain/entities/marks/settings/mark-hour-bank";
import { dateSubmited } from "@/view/components/toaster/date-submited";
import { toastController } from "@/view/components/toaster/toast-controller";
import { toastError } from "@/view/components/toaster/toast-error";
import { Button } from "@/view/components/ui/button";
import { useContextTimeTracking } from "@/view/pages/timetracking/provider/time-tracking-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Settings } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

interface UseMarkHourBankParams {
	collaborator: {
		id: string;
		name: string;
		position: string;
	};
	hasRecord?: boolean;
	initialFormValues: MarkHourBankEntryBulkFormProps
}

export function useMarkHourBank({ initialFormValues, hasRecord }: UseMarkHourBankParams) {
	const { refetchGridValues } = useContextTimeTracking();
	const { reset } = useContextSheetContentController();
	const { setModalAndOpen, resetModal } = useModal();
	const hasEntries = initialFormValues.entries.length > 1 && initialFormValues.entries?.[0]?.id !== undefined && hasRecord
	const user = useSession().data?.user
	const token = user?.token ?? ""
	const hourBankEntryFacade = useMemo(() => hourBankEntryFacadeFactory(token), [token])
	const form = useForm<MarkHourBankEntryBulkFormProps>({
		values: initialFormValues,
		resolver: zodResolver(timetrackingHourBankSchema),
		mode: "onSubmit",
	});
	const control = form.control;
	const { fields, remove, append } = useFieldArray({
		control,
		name: "entries",
	});

	async function deleteEntry(entryId: string, index: number) {
		try {
			await hourBankEntryFacade.delete(entryId)
			remove(index)
			toast("Hora extra removida")
		} catch {
		}
	}

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
					<p className="font-semibold">Ajuste no banco de horas!</p>
					<span className="text-muted-foreground truncate">{dateSubmited()}</span>
				</div>
			</>
		);
	}
	function creatEntry() {
		append({ ...initialFormValues.entries[0], minutes: "", type: MarkHourBankEntryTypeEnum.CREDIT, id: undefined });
	}
	function saveAllFieldsInForm() {
		for (const f of fields) {
			const newRequests = [...form.getValues("entries")];
			newRequests.push({ ...f });
			form.setValue("entries", newRequests);
		}
	}

	async function onSubmit({ entries }: MarkHourBankEntryBulkFormProps) {
		try {
			const entriesToCreate = entries.filter(({ id }) => id !== undefined)
			await hourBankEntryFacade.createBulk({ entries: entriesToCreate })
			saveAllFieldsInForm();
			reset();
			toastController.custom({
				Component: <Icon />,
				action: {
					label: "Desfazer",
					onClick: () => { },
				},
			});
			refetchGridValues()
		} catch {
			toastError({ tittle: "Erro de servidor" })
		}
	}

	return {
		form,
		openModalUndoMark,
		onSubmit,
		fields,
		remove,
		creatEntry,
		hasEntries,
		deleteEntry,
	};
}
