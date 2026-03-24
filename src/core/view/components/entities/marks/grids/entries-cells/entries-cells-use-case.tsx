import {
	type EntryAndOutKey,
	type MarkEntriesAndOutsDetails,
	type MarkEntriesAndOutsDetailsRequired,
	MarkStatusEnum,
} from "@/domain/entities/marks/marks";
import type { CollaboratorWithTurnParams } from "@/domain/entities/time-tracking/timetraking-collaborator";
import { MarkEntriesDayoffCell } from "./entries-dayoff-cell";
import { MarkEntriesDentCell } from "./entries-dent-cell";
import { MarkEntriesManualCell } from "./entries-manual-cell";
import { MarkEntriesMedCell } from "./entries-med-cell";
import { MarkEntriesMissingCell } from "./entries-missing-cell";
import {
	MarkEntriesNormalCell,
	type MarkEntriesNormalCellParams,
} from "./entries-normal-cell/entries-normal-cell";

interface MarkEntriesCellsUseCaseParams extends MarkEntriesAndOutsDetails {
	collaborator: CollaboratorWithTurnParams;
	entryKey: EntryAndOutKey;
	date: Date;
	refetchGridValues: () => void;
	moveRightDisabled?: boolean;
	moveLeftDisabled?: boolean;
	movePreviousDateDisabled?: boolean;
	moveNextDateDisabled?: boolean;
	disconsiderDisabled?: boolean;
}
interface MarkEntriesCellsUseCaseParamsRequired extends MarkEntriesAndOutsDetailsRequired {
	collaborator: CollaboratorWithTurnParams;
	entryKey: EntryAndOutKey;
}

export function MarkEntriesCellsUseCase(params: MarkEntriesCellsUseCaseParams) {
	const {
		collaborator,
		entryKey,
		idMark,
		justify,
		responsible,
		status,
		value,
		date,
		refetchGridValues,
		disconsiderDisabled,
		moveLeftDisabled,
		moveNextDateDisabled,
		movePreviousDateDisabled,
		moveRightDisabled,
	} = params;
	const { dayoff, dent, med, missing, normal, manual } = MarkStatusEnum;
	const cell = {
		[normal]: (
			<MarkEntriesNormalCell
				{...({
					details: {
						idMark,
						justify,
						responsible,
						status,
						value,
					},
					idMark,
					collaborator,
					entryKey,
					refetchGridValues,
					date,
					disconsiderDisabled,
					moveLeftDisabled,
					moveNextDateDisabled,
					movePreviousDateDisabled,
					moveRightDisabled,
					status,
				} as MarkEntriesNormalCellParams)}
			/>
		),
		[manual]: (
			<MarkEntriesManualCell
				{...(params as MarkEntriesCellsUseCaseParamsRequired)}
				date={date}
				refetchGridValues={refetchGridValues}
			/>
		),
		[dayoff]: <MarkEntriesDayoffCell />,
		[med]: <MarkEntriesMedCell />,
		[dent]: <MarkEntriesDentCell />,
		[missing]: <MarkEntriesMissingCell {...params} />,
	};

	return cell[params.status ?? normal];
}
