import { format, isDate } from "date-fns";
import { CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";
import { useContextTimeTracking } from "../../../provider/time-tracking-provider";
const { ptBR } = require("date-fns/locale/pt-BR");

export function TimeTrackingDailyInfo() {
	const { headerForm } = useContextTimeTracking();
	const date = headerForm.getValues("dailyDate");
	const [info, setInfo] = useState<string>();
	useEffect(() => {
		const dateCase = isDate(date) ? date : new Date(); // Garantir "yyyy-MM"
		const isoDate = format(dateCase, "dd/MM/yyyy");
		const dayName = format(dateCase, "EEEE", { locale: ptBR });
		const firstLetter = dayName.slice(0, 1).toUpperCase();
		const parsedDayName = `(${firstLetter}${dayName.slice(1)})`;
		setInfo(`${isoDate} ${parsedDayName}`);
	}, [date]);
	return (
		<div className="flex gap-2  text-muted-foreground items-center">
			<CalendarDays className="w-4 h-4" /> {info}
		</div>
	);
}
