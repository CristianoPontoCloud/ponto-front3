import type { OptionsParams } from "@/domain/components/options";
import { StatusDefaultEnum } from "@/domain/usecases/status-default";
import type { CellContext, ColumnDef } from "@tanstack/react-table";
import type { ReactElement } from "react";
import { Options } from "../options/options";
import { StatusViewer } from "../status-viewer/status-viewer";

type StatusViewerConfig<T> = {
	CustomStatusViewer?: ({ row }: CellContext<T, unknown>) => ReactElement;
};
// | {
// 		CustomStatusViewer?: never;
// 		statusViewerParams: ({
// 			row,
// 		}: CellContext<T, unknown>) => Partial<Pick<StatusViewerParams, "activeStatusRule">> &
// 			Pick<StatusViewerParams, "status">;
//   };

type OptionConfig<T> =
	| { CustomOption: ({ row }: CellContext<T, unknown>) => ReactElement; optionsParams?: never }
	| { CustomOption?: never; optionsParams: ({ row }: CellContext<T, unknown>) => OptionsParams };

export type GenerateStatusColumnParams<T> = StatusViewerConfig<T> &
	OptionConfig<T> & {
		classNames?: {
			header?: string;
			cell?: string;
		};
		pronoun?: "female" | "male";
	};

export function generateStatusColumn<T extends { status: string | StatusDefaultEnum }>({
	CustomOption,
	CustomStatusViewer,
	optionsParams,
	classNames,
	pronoun = "male",
}: GenerateStatusColumnParams<T>): ColumnDef<T> {
	return {
		id: "options",
		size: 1,
		header: () => <div className={`flex pr-24 ${classNames?.header ?? "justify-start"}`}>Status</div>,
		cell: (cell) => {
			return (
				<div className={`flex gap-12 ${classNames?.cell ?? "justify-between"}`}>
					{!!CustomStatusViewer && <CustomStatusViewer {...cell} />}
					{!!CustomOption && <CustomOption {...cell} />}
					{!CustomStatusViewer && (
						<StatusViewer
							status={cell.row.original.status as StatusDefaultEnum}
							activeStatusRule={StatusDefaultEnum.active}
							pronoun={pronoun}
						/>
					)}
					{!CustomOption && optionsParams && (
						<Options
							options={optionsParams(cell)?.options}
							label={optionsParams(cell).label ?? "Ações"}
						/>
					)}
				</div>
			);
		},
	};
}
