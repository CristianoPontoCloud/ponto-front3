import type { MarkDayFlags, MarkSettingIds } from "@/domain/entities/marks/settings/mark-setting-ids";
import type { CollaboratorWithTurnParams } from "@/domain/entities/time-tracking/timetraking-collaborator";
import { parseTimestampToLocaleDate } from "@/domain/global-helpers/time-tools";
import { useContextTimeTracking } from "@/view/pages/timetracking/provider/time-tracking-provider";
import { useState } from "react";
import type { useSettingCellActionParams } from "./actions/setting-cell-action";
import { useSettingCellActionDayoff } from "./actions/use-setting-cell-action-dayoff";
import { useSettingCellActionHoliday } from "./actions/use-setting-cell-action-holiday";
import { useSettingCellActionHourbank } from "./actions/use-setting-cell-action-hourbank";
import { useSettingCellActionRequest } from "./actions/use-setting-cell-action-request";
import { useSettingCellActionTurn } from "./actions/use-setting-cell-action-turn";

interface useTimetrackingSettingCellParams {
	collaborator: CollaboratorWithTurnParams;
	date?: string;
	dayFlags: MarkDayFlags;
	settingIds: MarkSettingIds;
}

export function useTimetrackingSettingCell(params: useTimetrackingSettingCellParams) {
	const { date } = params
	const [open, setOpen] = useState<boolean>(false);
	const [canCloseOnBlur, setCanCloseOnBlur] = useState<boolean>(true);
	const { isTypeDaily, dailyDate } = useContextTimeTracking();
	function initialDateCase() {
		if (isTypeDaily) return dailyDate ?? new Date();
		return date ? parseTimestampToLocaleDate(date) : new Date();
	}
	const actionsParams: useSettingCellActionParams = { ...params, timestampDate: params.date, date: initialDateCase() }
	const turnActions = useSettingCellActionTurn(actionsParams)
	const requestActions = useSettingCellActionRequest(actionsParams)
	const hourBankActions = useSettingCellActionHourbank(actionsParams)
	const holidayActions = useSettingCellActionHoliday(actionsParams)
	const dayoffActions = useSettingCellActionDayoff(actionsParams)
	return {
		open,
		setOpen,
		canCloseOnBlur,
		setCanCloseOnBlur,
		...turnActions,
		...requestActions,
		...hourBankActions,
		...holidayActions,
		...dayoffActions,
	};
}
