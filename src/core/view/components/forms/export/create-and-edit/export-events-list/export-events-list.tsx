import { ExportTabEnum } from "@/domain/entities/exports/exports";
import type { ValueLabel } from "@/domain/value-label";
import { Button } from "@/view/components/ui/button";
import { DashedSeparator } from "@/view/components/ui/dashed-separator";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/view/components/ui/dropdown-menu";
import { ScrollArea } from "@/view/components/ui/scroll-area";
import { ChevronDown } from "lucide-react";
import { useContextExportFieldsAndEventsProvider } from "../providers/export-fields-and-events-provider";
import { ExportEventCard } from "./card/export-event-card";

export function ExportEventsList({ height }: { height: number }) {
	const { form, tab } = useContextExportFieldsAndEventsProvider();
	// const ref = useRef<HTMLDivElement>(null);
	// const height = useTopOffset(ref) - 550;
	if (tab !== ExportTabEnum.EVENTS) return;
	const events = [
		{ label: "Hora extra", value: "overtime" },
		{ label: "Evento de hora extra por código", value: "overtimeEventByCode" },
		{ label: "Evento de justificativa por código", value: "justificationEventByCode" },
		{
			label: "Evento de compensação de banco de horas por código",
			value: "timeBankCompensationEventByCode",
		},
		{ label: "Evento de compensação de banco de horas", value: "timeBankCompensationEvent" },
		{ label: "ID do tipo de inconsistência", value: "inconsistencyTypeId" },
		{ label: "Data da falta", value: "absenceDate" },
		{ label: "Dia falta", value: "absenceDay" },
		{ label: "Dias trabalhados", value: "workedDays" },
		{ label: "Dia útil", value: "businessDay" },
		{ label: "Feriado", value: "holiday" },
		{ label: "Previsto", value: "expected" },
		{ label: "Horas previstas", value: "expectedHours" },
		{ label: "Diurnas normais", value: "regularDayHours" },
		{ label: "Noturnas normais", value: "regularNightHours" },
		{ label: "Total normais", value: "totalRegularHours" },
		{ label: "Total trabalhado", value: "totalWorkedHours" },
		{ label: "Intervalo", value: "breakTime" },
		{ label: "Total noturno", value: "totalNightHours" },
	];
	function addNewEvent({ label }: ValueLabel) {
		const arr = [...form.watch("events")];
		arr.push({
			align: "",
			code: "",
			decimals: "",
			fill: "",
			name: label,
		});
		form.setValue("events", arr);
	}
	return (
		<>
			<div className="flex justify-between items-end">
				<div className="flex flex-col gap-1">
					<span className="text-black dark:text-white">Campos específicos</span>
					<span className="text-muted-foreground">
						Clique no botão à direita para adicionar um novo campo.
					</span>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="outline"
							className={"hover:bg-transparent"}
							data-testid="open-options-button"
						>
							Adicionar evento <ChevronDown />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent data-testid="options-content" align="end">
						<DropdownMenuLabel>Eventos</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							{events.map(({ label, value }, index) => (
								<div key={index.toString()}>
									<DropdownMenuItem
										onClick={() => addNewEvent({ label, value })}
										className="cursor-pointer"
									>
										{label}
									</DropdownMenuItem>
								</div>
							))}
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<DashedSeparator />
			<ScrollArea className="rounded-lg" style={{ height }}>
				<div className="flex flex-col gap-3">
					{form.watch("events").map((params, index) => (
						<ExportEventCard index={index} eventParams={params} key={index.toString()} />
					))}
				</div>
			</ScrollArea>
		</>
	);
}
