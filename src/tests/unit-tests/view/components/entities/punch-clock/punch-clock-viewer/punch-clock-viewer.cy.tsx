import { PunchClockViewer } from "@/view/components/entities/punch-clock/punch-clock-viewer/punch-clock-viewer";
import "@/view/styles/globals.css";
import { format } from "date-fns";
const { ptBR } = require("date-fns/locale/pt-BR");
describe("<PunchClockViewer />", () => {
	it("PunchClockViewer component must render punch-list", () => {
		cy.mount(<PunchClockViewer height={500} />);
		cy.get("div[id=punch-list]").should("exist");
	});
	it("PunchClockViewer component must render week day name and br iso date", () => {
		const now = new Date();
		const weekDayName = format(now, "EEEE", { locale: ptBR });
		const weekDayNameCaptalized = weekDayName.charAt(0).toUpperCase() + weekDayName.slice(1);
		const formatedDate = format(now, "dd/MM/yyyy", { locale: ptBR });
		cy.mount(<PunchClockViewer height={500} />);
		cy.get("span[id=date]")
			.should("exist")
			.should("have.text", `${weekDayNameCaptalized}, ${formatedDate}`);
	});
});
