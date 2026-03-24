import { dailySlotFacadeFactory } from "@/application/factories/daily-slot";
import { useContextSheetContentController } from "@/application/providers/sheet-content/sheet-component-provider";
import type { MarkFormProps } from "@/domain/entities/marks/desconsider-marks";
import type { MarkType } from "@/domain/entities/marks/marks";
import { parseEntryKeyToSlotKindAndIndex } from "@/domain/entities/marks/parse-entry-key-to-slot-kind-and-index";
import { toastController } from "@/view/components/toaster/toast-controller";
import { toastError } from "@/view/components/toaster/toast-error";
import { format } from "date-fns";
import { AlarmClockOff, AlarmClockPlus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import type { UseFormReturn } from "react-hook-form";
import { entriesEditToastMessage } from "../entries-edit-toast-message";
interface UseMarkSubmitCases {
	idMark?: string;
	punchClockId?: string;
	type: MarkType;
	form: UseFormReturn<MarkFormProps>;
	collaborator: {
		id: string;
		name: string;
		position: string;
	};
	refetchGridValues: () => void;
}
export function useMarkSubmitCases({
	idMark,
	type,
	form,
	collaborator,
	refetchGridValues,
}: UseMarkSubmitCases) {
	const { reset } = useContextSheetContentController();
	const user = useSession().data?.user;
	const token = user?.token ?? "";
	const dailySlotFacade = useMemo(() => dailySlotFacadeFactory(token), [token]);
	const entryKey = form.watch("entryKey");
	function IconInclude() {
		return (
			<>
				<div className="w-11 h-11 rounded-lg bg-yellow-50 dark:bg-yellow-900/10 flex justify-center items-center">
					<AlarmClockPlus className="text-yellow-600 w-4 h-4" />
				</div>
				<div>
					<p className="font-semibold">
						{idMark ? "Marcação atualizada com sucesso!" : "Marcação incluída!"}
					</p>
					<span className="text-muted-foreground truncate">
						{entriesEditToastMessage({
							hour: form.watch("hour"),
							key: entryKey,
							name: collaborator.name,
						})}
					</span>
				</div>
			</>
		);
	}

	function IconDisconsider() {
		return (
			<>
				<div className="w-11 h-11 rounded-lg bg-red-50 dark:bg-red-900/10 flex justify-center items-center">
					<AlarmClockOff className="text-red-600 w-4 h-4" />
				</div>
				<div>
					<p className="font-semibold">Marcação desconsiderada!</p>
					<span className="text-muted-foreground truncate">
						{entriesEditToastMessage({
							hour: form.watch("hour"),
							key: entryKey,
							name: collaborator.name,
						})}
					</span>
				</div>
			</>
		);
	}

	async function submitDesconsiderCase(data: MarkFormProps) {
		if (!idMark) return;
		await dailySlotFacade.ignore({
			slotId: idMark,
			body: {
				reason: data.justify,
			},
		});
		toastController.custom({
			Component: <IconDisconsider />,
			action: {
				label: "Desfazer",
				onClick: () => {},
			},
		});
		refetchGridValues();
		reset();
		return;
	}

	async function submitIncludeCase(data: MarkFormProps) {
		const { index, kind } = parseEntryKeyToSlotKindAndIndex(entryKey);
		await dailySlotFacade.create({
			collaboratorId: collaborator.id,
			date: format(data.date, "yyyy-MM-dd"),
			index,
			kind,
			reason: data.justify,
			timeValue: data.hour,
		});
		toastController.custom({
			Component: <IconInclude />,
			action: {
				label: "Desfazer",
				onClick: () => {},
			},
		});
		refetchGridValues();
		reset();
	}
	async function submitReconsiderCase() {
		if (!idMark) return;
		await dailySlotFacade.reconsider({
			slotId: idMark,
			body: {
				punchClockId: "",
			},
		});
		toastController.custom({
			Component: <IconInclude />,
			action: {
				label: "Desfazer",
				onClick: () => {},
			},
		});
		refetchGridValues();
		reset();
	}

	async function submitUseCase(data: MarkFormProps) {
		const submitCases = {
			disconsider: async () => await submitDesconsiderCase(data),
			include: async () => await submitIncludeCase(data),
			exclude: async () => {},
			reconsider: async () => await submitReconsiderCase(),
		};
		try {
			await submitCases[type]();
		} catch {
			toastError({ tittle: "Error" });
		}
	}
	return { submitUseCase };
}
