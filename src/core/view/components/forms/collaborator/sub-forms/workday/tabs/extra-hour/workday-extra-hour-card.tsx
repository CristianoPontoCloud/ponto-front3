import { useModal } from "@/application/providers/modal-provider/modal-provider";
import type { CollaboratorWorkdayExtraHour } from "@/domain/entities/collaborator/collaborator";
import { Card } from "@/view/components/card/card";
import { Badge } from "@/view/components/ui/badge";
import { Button } from "@/view/components/ui/button";
import { format } from "date-fns";
import { Trash } from "lucide-react";

interface WorkdayExtraHourCardParams {
	extraHour: CollaboratorWorkdayExtraHour;
	index: number;
	disable: boolean;
	excludeLastExtraHour: (extraHourId: string) => Promise<void>;
}

function Header({ extraHour, disable, excludeLastExtraHour }: WorkdayExtraHourCardParams) {
	const { setModalAndOpen, resetModal } = useModal();

	const startDate = extraHour.startDate ? format(extraHour.startDate, "dd/MM/yyyy") : "";
	const endDate = extraHour.endDate ? format(extraHour.endDate, "dd/MM/yyyy") : "";

	function openModal() {
		if (disable) return;
		setModalAndOpen({
			title: "Excluir hora extra",
			content: (
				<div className="w-[352px] flex flex-col gap-4">
					<p>
						<span className="font-semibold">Atenção:</span> a exclusão dessa hora extra é
						irreversível e não poderá ser desfeita. Ao prosseguir, o turno anterior será
						automaticamente definido como atual.
					</p>
					<p>Tem certeza que deseja continuar?</p>
				</div>
			),
			footer: (
				<div className="w-full flex justify-end items-center gap-3">
					<Button onClick={() => resetModal()} type="button" variant="outline">
						Cancelar
					</Button>
					<Button
						onClick={() => excludeLastExtraHour(extraHour.extraHourId)}
						type="button"
						variant="destructive"
					>
						Excluir
					</Button>
				</div>
			),
		});
	}
	return (
		<div className="w-full flex justify-between items-center">
			<div className="flex gap-2 items-center">
				<p>{`${startDate} até ${endDate}`}</p>
				{!endDate && (
					<Badge className="bg-primary/10 text-primary h-[20px] w-[50px] flex justify-center">
						Atual
					</Badge>
				)}
			</div>
			<Button type="button" disabled={disable} onClick={() => openModal()} variant="link">
				<Trash className="text-destructive" />
			</Button>
		</div>
	);
}

function Body(params: WorkdayExtraHourCardParams["extraHour"]) {
	const { extraHourName, observation } = params;
	const startDate = params.startDate ? format(params.startDate, "dd/MM/yyyy") : "";
	return (
		<div className="flex flex-col gap-4 text-muted-foreground">
			<p>{`Hora extra: ${extraHourName}`}</p>
			<p>{`Início da vigência: ${startDate}`}</p>
			{observation && <p>{`Observação: ${observation}`}</p>}
		</div>
	);
}

export function WorkdayExtraHourCard(params: WorkdayExtraHourCardParams) {
	return (
		<Card header={<Header {...params} />}>
			<Body {...params.extraHour} />
		</Card>
	);
}
