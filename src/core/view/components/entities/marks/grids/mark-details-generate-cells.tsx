import type { MarkViewDailyData } from "@/domain/entities/marks/mark-view-daily-data";
import { cellBorderRemover } from "@/view/components/grids/cell-border-remover";
import { CenterTextCell } from "@/view/components/react-grid/ui-cells/center-text-cell";
import { CredDebtTimeCell } from "@/view/pages/timetracking/components/grids/shared-cells/cred-debt-cell";
import type { DefaultCellTypes } from "@silevis/reactgrid";

interface MarkDetailsGenerateCells {
	mark: MarkViewDailyData;
	hasDesconsiderMark: boolean;
	matcher: "daily" | "timetracking" | "irregularities";
}
export function markDetailsGenerateCells({
	hasDesconsiderMark,
	mark,
	matcher,
}: MarkDetailsGenerateCells): DefaultCellTypes[] {
	const removerFields = {
		daily: (key: string) =>
			key !== "collaborator" && key !== "settingIds" && key !== "desconsiderMarks",
		timetracking: (key: string) => key !== "dayMonth" && key !== "dayWeek",
		irregularities: (key: string) =>
			key !== "collaborator" &&
			key !== "settingIds" &&
			key !== "desconsiderMarks" &&
			key !== "dayMonth" &&
			key !== "dayWeek",
	};
	const filtered = Object.fromEntries(
		Object.entries(mark).filter(([key]) => removerFields[matcher](key)),
	);
	const hrDetails = Object.keys(filtered).filter((key) => typeof filtered[key] === "string");
	return hrDetails.map((key, index): DefaultCellTypes => {
		const value = filtered[key] as unknown as string;
		if (key === "hrBankCredDebt") {
			return {
				type: "text",
				text: "",
				nonEditable: true,
				style: !hasDesconsiderMark
					? cellBorderRemover({ right: index === hrDetails.length - 1 })
					: {},
				renderer: () => <CredDebtTimeCell value={value} key={index.toString()} />,
			};
		}
		return {
			type: "text",
			text: "",
			nonEditable: true,
			style: !hasDesconsiderMark
				? cellBorderRemover({ right: index === hrDetails.length - 1 })
				: {},
			renderer: () => <CenterTextCell text={value} key={index.toString()} />,
		};
	});
}
