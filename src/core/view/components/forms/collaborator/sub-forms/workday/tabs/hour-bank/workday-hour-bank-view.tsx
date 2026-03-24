import { collaboratorsFacadeFactory } from "@/application/factories/collaborator/collaborators-facade-factory";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import type { CollaboratorFormProps } from "@/domain/entities/collaborator/collaborator";
import { dateSubmited } from "@/view/components/toaster/date-submited";
import { toastController } from "@/view/components/toaster/toast-controller";
import { DashedSeparator } from "@/view/components/ui/dashed-separator";
import { useSession } from "next-auth/react";
import { useFormContext } from "react-hook-form";
import { WorkdayHourBankList } from "./worday-hour-bank-list";
import { WorkdayHourBankForm } from "./workday-hour-bank-form";

export function WorkdayHourBankView() {
	const form = useFormContext<CollaboratorFormProps>();
	const id = form.watch("id") ?? "";
	const token = useSession().data?.user?.token ?? "";
	const hourBanks = form.watch("hourBanks");
	const { resetModal } = useModal();
	async function excludeLastHourBank(hourBankId: string) {
		const response = await collaboratorsFacadeFactory(token).updateWorkJourney({
			collaboratorId: id,
			workJourneyId: hourBankId,
			workJourneyItem: "HOUR_BANK",
			workJourneyAction: "REMOVE",
		});
		form.setValue("hourBanks", response?.hourBanks ?? []);
		resetModal();
		function ToastComponent() {
			return (
				<div className="flex flex-col gap-1 w-fit">
					<span className="truncate">Banco de horas excluído com sucesso!</span>
					<span className="text-muted-foreground">{dateSubmited()}</span>
				</div>
			);
		}
		toastController.custom({
			Component: <ToastComponent />,
			action: {
				label: "Desfazer",
				onClick: () => {},
			},
		});
	}

	return (
		<div className="flex flex-col gap-4">
			<DashedSeparator className="cols-span-2" />
			{id && <WorkdayHourBankList {...{ hourBanks, excludeLastHourBank }} />}
			{!id && <WorkdayHourBankForm />}
		</div>
	);
}
