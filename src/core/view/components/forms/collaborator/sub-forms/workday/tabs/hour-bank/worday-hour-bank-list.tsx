import { useBottomOffset } from "@/application/hooks/use-bottom-off-set";
import type {
	CollaboratorDetails,
	CollaboratorFormProps,
	CollaboratorWorkdayHourBank,
} from "@/domain/entities/collaborator/collaborator";
import { Button } from "@/view/components/ui/button";
import { ScrollArea } from "@/view/components/ui/scroll-area";
import { RefreshCcw } from "lucide-react";
import { useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useCollaboratorOpenModaForms } from "../../../../modal-forms/use-collaborator-open-modal-forms";
import { WorkdayHourBankCard } from "./workday-hour-bank-card";

interface WorkdayHourBankListParams {
	hourBanks: CollaboratorWorkdayHourBank[];
	excludeLastHourBank: (hourBankId: string) => Promise<void>;
}
export function WorkdayHourBankList({ hourBanks, excludeLastHourBank }: WorkdayHourBankListParams) {
	const openForm = useCollaboratorOpenModaForms();
	const headerRef = useRef<HTMLDivElement>(null);
	const height = useBottomOffset(headerRef);
	const form = useFormContext<CollaboratorFormProps>();
	function updateHouBanks(newHourBanks: CollaboratorDetails["hourBanks"]) {
		form.setValue("hourBanks", newHourBanks);
	}
	const collaboratorViewer = {
		name: form.watch("name"),
		position: form.watch("position"),
		src: form.watch("imageUrl"),
	};
	const id = form.watch("id");
	function openHourBankModalForm() {
		openForm.hourBank({
			collaboratorViewer,
			collaboratorId: id ?? "",
			getSubmitResponse: updateHouBanks,
		});
	}
	return (
		<>
			<div className="flex items-center justify-between" ref={headerRef}>
				<p>Histórico de banco de horas</p>
				<Button variant="outline" type="button" onClick={() => openHourBankModalForm()}>
					<RefreshCcw />
					Alterar
				</Button>
			</div>
			<ScrollArea style={{ height: height - 90 }}>
				<div className="flex flex-col gap-4 pb-1">
					{hourBanks
						.slice()
						.reverse()
						?.map((hourBank, index) => {
							const isntFirstHourBank = index !== 0;
							return (
								<WorkdayHourBankCard
									hourBank={hourBank}
									index={index}
									key={index.toString()}
									disable={isntFirstHourBank}
									excludeLastHourBank={excludeLastHourBank}
								/>
							);
						})}
				</div>
			</ScrollArea>
		</>
	);
}
