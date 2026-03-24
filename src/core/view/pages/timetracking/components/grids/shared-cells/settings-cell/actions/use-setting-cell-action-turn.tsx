import { collaboratorWorkShiftFacadeFactory } from "@/application/factories/collaborator/collaborator-work-shift-factory";
import { collaboratorsFacadeFactory } from "@/application/factories/collaborator/collaborators-facade-factory";
import { useContextSheetContentController } from "@/application/providers/sheet-content/sheet-component-provider";
import type { CollaboratorEditTurnFormProps } from "@/domain/entities/collaborator/collaborator-edit-turn";
import { MarkTurnEditSheetForm, MarkTurnEditSheetFormHeader } from "@/view/components/forms/mark/turn-edit/mark-turn-edit";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import type { useSettingCellActionParams } from "./setting-cell-action";

export function useSettingCellActionTurn({ collaborator, dayFlags, date, timestampDate }: useSettingCellActionParams) {
  const turnHasRecord = dayFlags?.workshiftAdjustments?.hasRecords ?? false;
  const { setContentAndOpen } = useContextSheetContentController();
  const session = useSession()
  const token = session.data?.user.token ?? ""
  const facades = useMemo(() => ({
    collaboratorWorkshift: collaboratorWorkShiftFacadeFactory(token),
    collaborator: collaboratorsFacadeFactory(token),
  }), [token])
  async function getTurnUpdateInitialData(): Promise<CollaboratorEditTurnFormProps> {
    try {
      if (!turnHasRecord) throw new Error()
      const { data } = await facades.collaboratorWorkshift.findAll({
        collaboratorId: collaborator.id,
        startDate: timestampDate,
        endDate: timestampDate,
      })
      if (!data?.length) throw new Error()
      const { workShift, obs, createdAt, endDate } = data[0]
      return {
        startDate: new Date(createdAt),
        endDate: new Date(endDate),
        observation: obs,
        positionCycle: "",
        turnId: workShift.id
      }
    } catch {
      const collaboratorDetails = await facades.collaborator.findById(collaborator.id)
      const turnId = collaboratorDetails?.workShiftAssignments?.slice()
        ?.reverse()[0]?.workShift.id ?? ""
      return {
        endDate: date,
        observation: "",
        positionCycle: "",
        startDate: date,
        turnId: turnId
      }
    }
  }
  async function openTurnSheet() {
    const initialData = await getTurnUpdateInitialData()
    setContentAndOpen({
      sheetMinWidth: "410px",
      Header: <MarkTurnEditSheetFormHeader />,
      Body: (
        <MarkTurnEditSheetForm
          collaborator={collaborator}
          values={{
            ...initialData
          }}
          hasRecord={turnHasRecord}
        />
      ),
    });
  }
  return { openTurnSheet, turnHasRecord }
}
