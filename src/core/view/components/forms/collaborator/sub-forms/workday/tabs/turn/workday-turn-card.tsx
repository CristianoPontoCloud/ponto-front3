import { useModal } from "@/application/providers/modal-provider/modal-provider";
import type { WorkShiftAssignment } from "@/domain/entities/collaborator/collaborator";
import { Card } from "@/view/components/card/card";
import { Badge } from "@/view/components/ui/badge";
import { Button } from "@/view/components/ui/button";
import { format } from "date-fns";
import { Trash } from "lucide-react";

interface WorkdayTurnCardParams {
	turn: WorkShiftAssignment;
	index: number;
	disable: boolean;
	excludeLastTurn: (turnId: string) => Promise<void>;
}

function Header({ turn, disable, excludeLastTurn, index }: WorkdayTurnCardParams) {
	const { setModalAndOpen, resetModal } = useModal();
	const startDate = turn.startDate ? format(turn.startDate, "dd/MM/yyyy") : "";
	const endDate = turn.endDate ? format(turn.endDate, "dd/MM/yyyy") : "";
	function openModal() {
		if (disable) return;
		setModalAndOpen({
			title: "Excluir turno",
			content: (
				<div className="w-[352px] flex flex-col gap-4">
					<p>
						<span className="font-semibold">Atenção:</span> a exclusão deste turno é irreversível e
						não poderá ser desfeita. Ao prosseguir, o turno anterior será automaticamente definido
						como atual.
					</p>
					<p>Tem certeza que deseja continuar?</p>
				</div>
			),
			footer: (
				<div className="w-full flex justify-end items-center gap-3">
					<Button onClick={() => resetModal()} type="button" variant="outline">
						Cancelar
					</Button>
					<Button onClick={() => excludeLastTurn(turn.id)} type="button" variant="destructive">
						Excluir
					</Button>
				</div>
			),
		});
	}
	return (
		<div className="w-full flex justify-between items-center">
			<div className="flex gap-2 items-center">
				<p>{`${startDate} até ${index !== 0 ? endDate : ""}`}</p>
				{index === 0 && (
					<Badge className="bg-primary/10 text-primary h-[20px] w-[50px] flex justify-center">
						Atual
					</Badge>
				)}
			</div>
			<Button variant="link" type="button" disabled={disable} onClick={() => openModal()}>
				<Trash className="text-destructive" />
			</Button>
		</div>
	);
}

function Body(params: WorkShiftAssignment) {
	const { cycleOffset, startDate, obs, workShift: { name } } = params;

	return (
		<div className="flex flex-col gap-4 text-muted-foreground">
			<p>{`Turno: ${name}`}</p>
			<p>{`Início da vigência: ${startDate ?? ""}`}</p>
			<p>{`Posição do cíclo: ${cycleOffset}`}</p>
			{obs && <p>{`Observação: ${obs}`}</p>}
		</div>
	);
}

export function WorkdayTurnCard(params: WorkdayTurnCardParams) {
	return (
		<Card header={<Header {...params} />}>
			<Body {...params.turn} />
		</Card>
	);
}
