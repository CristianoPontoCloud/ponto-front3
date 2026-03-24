import { collaboratorsFacadeFactory } from "@/application/factories/collaborator/collaborators-facade-factory";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import type { CollaboratorFormProps } from "@/domain/entities/collaborator/collaborator";
import { dateSubmited } from "@/view/components/toaster/date-submited";
import { toastController } from "@/view/components/toaster/toast-controller";
import { DashedSeparator } from "@/view/components/ui/dashed-separator";
import { useSession } from "next-auth/react";
import { useFormContext } from "react-hook-form";
import { WorkdayExtraHourForm } from "./workday-extra-hour-form";
import { WorkdayExtraHourList } from "./workday-extra-hour-list";

export function WorkdayExtraHourView() {
	const form = useFormContext<CollaboratorFormProps>();
	const id = form.watch("id") ?? "";
	const token = useSession().data?.user?.token ?? "";
	const extraHours = form.watch("extraHours");
	const { resetModal } = useModal();
	async function excludeLastExtraHour(hourBankId: string) {
		const response = await collaboratorsFacadeFactory(token).updateWorkJourney({
			collaboratorId: id,
			workJourneyId: hourBankId,
			workJourneyItem: "EXTRA_TIME",
			workJourneyAction: "REMOVE",
		});
		form.setValue("extraHours", response?.extraHours ?? []);
		resetModal();
		function ToastComponent() {
			return (
				<div className="flex flex-col gap-1 w-fit">
					<span className="truncate">Hora extra excluído com sucesso!</span>
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
			{id && <WorkdayExtraHourList {...{ extraHours, excludeLastExtraHour }} />}
			{!id && <WorkdayExtraHourForm />}
		</div>
	);
}
