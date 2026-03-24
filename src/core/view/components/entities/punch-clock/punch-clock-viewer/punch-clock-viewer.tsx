import { format } from "date-fns";
import { PunchList } from "./punch-list/punch-list";
const { ptBR } = require("date-fns/locale/pt-BR");

interface PunchClockViewerParams {
	height: number;
}

export function PunchClockViewer({ height }: PunchClockViewerParams) {
	const now = new Date();
	const weekDayName = format(now, "EEEE", { locale: ptBR });
	const weekDayNameCaptalized = weekDayName.charAt(0).toUpperCase() + weekDayName.slice(1);
	const formatedDate = format(now, "dd/MM/yyyy", { locale: ptBR });
	return (
		<div
			className="flex flex-col p-5 rounded-lg w-1/5 min-w-[210px] border gap-6"
			style={{ height }}
			id="punch-clock-viewer"
		>
			<div className="flex flex-col gap-[8px] justify-between">
				<div className="flex flex-col gap-[8px]">
					<h2 className="text-xl font-semibold">Hoje</h2>
					<span
						className="text-sm text-muted-foreground"
						id="date"
					>{`${weekDayNameCaptalized}, ${formatedDate}`}</span>
				</div>
			</div>
			<PunchList />
			<span id="time-counter">Duração: 00:00:00</span>
		</div>
	);
}
