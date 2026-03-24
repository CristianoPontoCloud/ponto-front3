import { format } from "date-fns";
const { ptBR } = require("date-fns/locale/pt-BR");


export function dateSubmited() {
	const date = new Date();
	const dayName = format(date, "EEEE", { locale: ptBR });
	const dayNameCapitalized = dayName.charAt(0).toUpperCase() + dayName.slice(1);
	const day = format(date, "dd");
	const Month = format(date, "MMMM", { locale: ptBR });
	const year = format(date, "yyyy");
	return `${dayNameCapitalized}, ${day} de ${Month} de ${year}.`;
}
export function parseDateSubmited(dt: string | Date) {
	const date = new Date(dt);
	const dayName = format(date, "EEEE", { locale: ptBR });
	const dayNameCapitalized = dayName.charAt(0).toUpperCase() + dayName.slice(1);
	const day = format(date, "dd");
	const Month = format(date, "MMMM", { locale: ptBR });
	const year = format(date, "yyyy");
	return `${dayNameCapitalized}, ${day} de ${Month} de ${year}.`;
}
