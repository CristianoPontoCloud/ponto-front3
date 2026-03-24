import { useBottomOffset } from "@/application/hooks/use-bottom-off-set";
import type {
	CollaboratorDetails,
	CollaboratorFormProps,
	CollaboratorWorkdayExtraHour,
} from "@/domain/entities/collaborator/collaborator";
import { Button } from "@/view/components/ui/button";
import { ScrollArea } from "@/view/components/ui/scroll-area";
import { RefreshCcw } from "lucide-react";
import { useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useCollaboratorOpenModaForms } from "../../../../modal-forms/use-collaborator-open-modal-forms";
import { WorkdayExtraHourCard } from "./workday-extra-hour-card";

interface WorkdayExtraHourListParams {
	extraHours: CollaboratorWorkdayExtraHour[];
	excludeLastExtraHour: (extraHourId: string) => Promise<void>;
}
export function WorkdayExtraHourList({
	extraHours,
	excludeLastExtraHour,
}: WorkdayExtraHourListParams) {
	const openForm = useCollaboratorOpenModaForms();
	const headerRef = useRef<HTMLDivElement>(null);
	const height = useBottomOffset(headerRef);
	const form = useFormContext<CollaboratorFormProps>();
	function updateExtraHour(newExtraHour: CollaboratorDetails["extraHours"]) {
		form.setValue("extraHours", newExtraHour);
	}
	const collaboratorViewer = {
		name: form.watch("name"),
		position: form.watch("position"),
		src: form.watch("imageUrl"),
	};
	const id = form.watch("id");
	function openExtraHourModalForm() {
		openForm.extraHour({
			collaboratorViewer,
			collaboratorId: id ?? "",
			getSubmitResponse: updateExtraHour,
		});
	}
	return (
		<>
			<div className="flex items-center justify-between" ref={headerRef}>
				<p>Histórico de hora extra</p>
				<Button variant="outline" type="button" onClick={() => openExtraHourModalForm()}>
					<RefreshCcw />
					Alterar
				</Button>
			</div>
			<ScrollArea style={{ height: height - 90 }}>
				<div className="flex flex-col gap-4">
					{extraHours?.map((extraHour, index) => {
						const isntFirstExtraHour = index !== 0;
						return (
							<WorkdayExtraHourCard
								extraHour={extraHour}
								index={index}
								key={index.toString()}
								disable={isntFirstExtraHour}
								excludeLastExtraHour={excludeLastExtraHour}
							/>
						);
					})}
				</div>
			</ScrollArea>
		</>
	);
}
