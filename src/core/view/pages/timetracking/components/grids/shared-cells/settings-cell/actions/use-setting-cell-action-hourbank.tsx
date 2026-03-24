import { collaboratorsFacadeFactory } from "@/application/factories/collaborator/collaborators-facade-factory";
import { hourBankEntryFacadeFactory } from "@/application/factories/hours/hour-bank-entry-facade-factory";
import { useContextSheetContentController } from "@/application/providers/sheet-content/sheet-component-provider";
import { type MarkHourBankEntryBulkFormProps, type MarkHourBankEntryFormProps, MarkHourBankEntryTypeEnum } from "@/domain/entities/marks/settings/mark-hour-bank";
import { MarkHourBankSheetForm, MarkHourBankSheetFormHeader } from "@/view/components/forms/mark/hour-bank/mark-hour-bank";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import type { useSettingCellActionParams } from "./setting-cell-action";

export function useSettingCellActionHourbank({ collaborator, dayFlags, date, timestampDate, settingIds }: useSettingCellActionParams) {
  const { setContentAndOpen } = useContextSheetContentController();
  const session = useSession()
  const token = session.data?.user.token ?? ""
  const facades = useMemo(() => ({
    collaborator: collaboratorsFacadeFactory(token),
    hourBankEntry: hourBankEntryFacadeFactory(token)
  }), [token])
  const hourbankHasRecord = dayFlags?.extraTime?.hasRecords ?? false;
  const hourBankId = settingIds?.idHourBank ?? ""
  const defaultFormValues: MarkHourBankEntryBulkFormProps = useMemo(() => ({
    entries: [
      {
        minutes: "",
        type: MarkHourBankEntryTypeEnum.CREDIT,
        collaboratorId: collaborator.id,
        date: timestampDate ? timestampDate : format(date, "yyyy-MM-dd"),
        hourBankId,
        id: undefined
      },
    ],
  }), [])
  async function getHourbankUpdateInitialData(): Promise<MarkHourBankEntryBulkFormProps> {
    try {
      if (!hourbankHasRecord || !hourBankId) throw new Error()
      const hourBankEntries = await facades.hourBankEntry.findAll({
        dateFrom: timestampDate,
        dateTo: timestampDate,
        collaboratorId: collaborator.id,
        hourBankId,
      })
      const entries = hourBankEntries?.data ?? []
      if (entries.length === 0) throw new Error()
      return {
        entries: entries.map((hourBankEntries): MarkHourBankEntryFormProps => hourBankEntries)
      }
    } catch {
      return defaultFormValues
    }
  }
  async function openHourBankSheet() {
    const initialData = await getHourbankUpdateInitialData()
    setContentAndOpen({
      sheetMinWidth: "410px",
      Header: <MarkHourBankSheetFormHeader />,
      Body: <MarkHourBankSheetForm collaborator={collaborator} hasRecord={hourbankHasRecord} initialFormValues={initialData} />,
    });
  }
  return { openHourBankSheet, hourbankHasRecord }
}
