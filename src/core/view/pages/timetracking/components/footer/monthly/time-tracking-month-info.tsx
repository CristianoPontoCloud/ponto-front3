import { getLabelMonthAndYear } from "@/domain/global-helpers/time-tools";
import { format, lastDayOfMonth, parse } from "date-fns";
import { CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";
import { useContextTimeTracking } from "../../../provider/time-tracking-provider";
const { ptBR } = require("date-fns/locale/pt-BR");
export function TimeTrackingMonthInfo() {
	const { monthlyDate } = useContextTimeTracking();
	const [info, setInfo] = useState<string>();
	useEffect(() => {
		const strDate = monthlyDate.length === 7 ? monthlyDate : new Date().toISOString().slice(0, 7);
		const parsedDate = parse(strDate, "yyyy-MM", new Date());
		const firstDay = format(parsedDate, "dd/MM/yyyy", { locale: ptBR });
		const lastDay = format(lastDayOfMonth(parsedDate), "dd/MM/yyyy", { locale: ptBR });
		setInfo(`${getLabelMonthAndYear(strDate)} - ${firstDay} à ${lastDay}`);
	}, [monthlyDate]);
	return (
		<div className="flex gap-2  text-muted-foreground items-center">
			<CalendarDays className="w-4 h-4" /> {info}
		</div>
	);
}
