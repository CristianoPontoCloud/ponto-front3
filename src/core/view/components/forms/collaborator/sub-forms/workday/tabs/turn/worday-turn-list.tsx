import { useBottomOffset } from "@/application/hooks/use-bottom-off-set";
import type {
	CollaboratorFormProps,
	WorkShiftAssignment
} from "@/domain/entities/collaborator/collaborator";
import { Button } from "@/view/components/ui/button";
import { ScrollArea } from "@/view/components/ui/scroll-area";
import { RefreshCcw } from "lucide-react";
import { useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useCollaboratorOpenModaForms } from "../../../../modal-forms/use-collaborator-open-modal-forms";
import { WorkdayTurnCard } from "./workday-turn-card";

interface WorkdayTurnListParams {
	turns: WorkShiftAssignment[];
	excludeLastTurn: (turnId: string) => Promise<void>;
}
export function WorkdayTurnList({ turns, excludeLastTurn }: WorkdayTurnListParams) {
	const openForm = useCollaboratorOpenModaForms();
	const headerRef = useRef<HTMLDivElement>(null);
	const height = useBottomOffset(headerRef);
	const form = useFormContext<CollaboratorFormProps>();
	function updateTurns(newTurns: WorkShiftAssignment[]) {
		form.setValue("workShiftAssignments", newTurns);
	}
	const collaboratorViewer = {
		name: form.watch("name"),
		position: form.watch("position"),
		src: form.watch("imageUrl"),
	};
	const id = form.watch("id");
	function openTurnModalForm() {
		openForm.turn({
			collaboratorViewer,
			collaboratorId: id ?? "",
			getSubmitResponse: updateTurns,
		});
	}
	return (
		<>
			<div className="flex items-center justify-between" ref={headerRef}>
				<p>Histórico de turnos</p>
				<Button variant="outline" type="button" onClick={() => openTurnModalForm()}>
					<RefreshCcw />
					Alterar
				</Button>
			</div>
			<ScrollArea style={{ height: height - 90 }}>
				<div className="flex flex-col gap-4 pb-1">
					{turns
						?.slice()
						?.reverse()
						?.map((turn, index) => {
							const isntFirstTurn = index !== 0;
							return (
								<WorkdayTurnCard
									turn={turn}
									index={index}
									key={index.toString()}
									disable={isntFirstTurn}
									excludeLastTurn={excludeLastTurn}
								/>
							);
						})}
				</div>
			</ScrollArea>
		</>
	);
}
