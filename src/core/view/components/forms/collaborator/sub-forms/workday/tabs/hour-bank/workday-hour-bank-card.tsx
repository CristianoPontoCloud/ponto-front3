import { useModal } from "@/application/providers/modal-provider/modal-provider";
import type { CollaboratorWorkdayHourBank } from "@/domain/entities/collaborator/collaborator";
import { Card } from "@/view/components/card/card";
import { Badge } from "@/view/components/ui/badge";
import { Button } from "@/view/components/ui/button";
import { format } from "date-fns";
import { Trash } from "lucide-react";

interface WorkdayHourBankCardParams {
	hourBank: CollaboratorWorkdayHourBank;
	index: number;
	disable: boolean;
	excludeLastHourBank: (hourBankId: string) => Promise<void>;
}

function Header({ hourBank, disable, excludeLastHourBank }: WorkdayHourBankCardParams) {
	const { setModalAndOpen, resetModal } = useModal();

	const startDate = hourBank.startDate ? format(hourBank.startDate, "dd/MM/yyyy") : "";
	const endDate = hourBank.endDate ? format(hourBank.endDate, "dd/MM/yyyy") : "";

	function openModal() {
		if (disable) return;
		setModalAndOpen({
			title: "Excluir banco de horas",
			content: (
				<div className="w-[352px] flex flex-col gap-4">
					<p>
						<span className="font-semibold">Atenção:</span> a exclusão desse banco de horas é
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
						onClick={() => excludeLastHourBank(hourBank.hourBankId)}
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

function Body(params: WorkdayHourBankCardParams["hourBank"]) {
	const { hourBankName, observation } = params;
	const startDate = params.startDate ? format(params.startDate, "dd/MM/yyyy") : "";
	return (
		<div className="flex flex-col gap-4 text-muted-foreground">
			<p>{`Banco de horas: ${hourBankName}`}</p>
			<p>{`Início da vigência: ${startDate}`}</p>
			{observation && <p>{`Observação: ${observation}`}</p>}
		</div>
	);
}

export function WorkdayHourBankCard(params: WorkdayHourBankCardParams) {
	return (
		<Card header={<Header {...params} />}>
			<Body {...params.hourBank} />
		</Card>
	);
}
