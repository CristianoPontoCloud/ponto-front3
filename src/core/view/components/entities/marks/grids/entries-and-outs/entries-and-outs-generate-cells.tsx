import type { EntryAndOutKey, MarkEntriesAndOutsRecord } from "@/domain/entities/marks/marks";
import type { CollaboratorWithTurnParams } from "@/domain/entities/time-tracking/timetraking-collaborator";
import { MarkEntriesCellsUseCase } from "@/view/components/entities/marks/grids/entries-cells/entries-cells-use-case";
import type { DefaultCellTypes } from "@silevis/reactgrid";
import { entriesAndOutsGetBg } from "./entries-and-out-background-color-case";

interface EntriesAndOutsGenerateCellsParams {
	period: number;
	currentEntryAndOut: MarkEntriesAndOutsRecord;
	collaborator: CollaboratorWithTurnParams;
	date: Date;
	refetchGridValues: () => void;
	entriesAndOuts: MarkEntriesAndOutsRecord[];
	index: number;
}

interface ActionsEntriesController {
	moveRightDisabled: boolean;
	moveLeftDisabled: boolean;
	movePreviousDateDisabled: boolean;
	moveNextDateDisabled: boolean;
	disconsiderDisabled: boolean;
}

export function entriesAndOutsGenerateCells({
	currentEntryAndOut,
	period,
	collaborator,
	date,
	refetchGridValues,
	entriesAndOuts,
	index,
}: EntriesAndOutsGenerateCellsParams): DefaultCellTypes[] {
	return Array.from({ length: period }).flatMap((_, periodIndex): DefaultCellTypes[] => {
		const period = periodIndex + 1;
		const entryKey: EntryAndOutKey = `entry${period}`;
		const outKey: EntryAndOutKey = `out${period}`;
		const entry = currentEntryAndOut[entryKey];
		const out = currentEntryAndOut[outKey];

		function ENTRY_DISABLED_CONTROLLER(): ActionsEntriesController {
			function getMoveLeftDisabled() {
				const previousOut = currentEntryAndOut?.[`out${period - 1}`];
				const moveLeftDisabledCase = period === 1 || !!previousOut.value;
				if (moveLeftDisabledCase) return true;
				return false;
			}

			function getMoveRightDisabled() {
				const moveRightDisabledCase = !!out.value;
				if (moveRightDisabledCase) return true;
				return false;
			}

			function getMovePreviousDateDisabled() {
				const previousDate = entriesAndOuts?.[index - 1] ?? [];
				const movePreviousDateDisabledCase = !previousDate || !!previousDate?.[entryKey]?.value;
				if (movePreviousDateDisabledCase) return true;
				return false;
			}

			function getMoveNextDateDisabled() {
				const nextDate = entriesAndOuts?.[index + 1] ?? [];
				const moveNextDateDisabledCase = !nextDate || !!nextDate?.[entryKey]?.value;
				if (moveNextDateDisabledCase) return true;
				return false;
			}

			const disconsiderDisabled = false;

			return {
				moveRightDisabled: getMoveRightDisabled(),
				moveLeftDisabled: getMoveLeftDisabled(),
				movePreviousDateDisabled: getMovePreviousDateDisabled(),
				moveNextDateDisabled: getMoveNextDateDisabled(),
				disconsiderDisabled,
			};
		}
		function OUT_DISABLED_CONTROLLER(): ActionsEntriesController {
			function getMoveLeftDisabled() {
				const moveLeftDisabledCase = !!out.value;
				if (moveLeftDisabledCase) return true;
				return false;
			}

			function getMoveRightDisabled() {
				const nextEntry = currentEntryAndOut?.[`entry${period + 1}`];
				const moveRightDisabledCase = period >= 6 || !!nextEntry.value;
				if (moveRightDisabledCase) return true;
				return false;
			}

			function getMovePreviousDateDisabled() {
				const previousDate = entriesAndOuts?.[index - 1] ?? [];
				const movePreviousDateDisabledCase = !previousDate || !!previousDate?.[outKey]?.value;
				if (movePreviousDateDisabledCase) return true;
				return false;
			}

			function getMoveNextDateDisabled() {
				const nextDate = entriesAndOuts?.[index + 1] ?? [];
				const moveNextDateDisabledCase = !nextDate || !!nextDate?.[outKey]?.value;
				if (moveNextDateDisabledCase) return true;
				return false;
			}

			const disconsiderDisabled = false;

			return {
				moveRightDisabled: getMoveRightDisabled(),
				moveLeftDisabled: getMoveLeftDisabled(),
				movePreviousDateDisabled: getMovePreviousDateDisabled(),
				moveNextDateDisabled: getMoveNextDateDisabled(),
				disconsiderDisabled,
			};
		}

		return [
			{
				type: "text",
				text: "",
				nonEditable: true,
				renderer: () => (
					<MarkEntriesCellsUseCase
						{...{
							...entry,
							collaborator,
							entryKey,
							date,
							refetchGridValues,
							...ENTRY_DISABLED_CONTROLLER(),
						}}
					/>
				),
				className: entriesAndOutsGetBg(entry.status),
			},
			{
				type: "text",
				text: "",
				nonEditable: true,
				renderer: () => (
					<MarkEntriesCellsUseCase
						{...{
							...out,
							collaborator,
							entryKey: outKey,
							date,
							refetchGridValues,
							...OUT_DISABLED_CONTROLLER(),
						}}
					/>
				),
				className: entriesAndOutsGetBg(out.status),
			},
		];
	});
}
