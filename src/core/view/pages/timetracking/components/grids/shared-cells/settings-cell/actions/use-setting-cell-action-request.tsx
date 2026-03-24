import { useContextSheetContentController } from "@/application/providers/sheet-content/sheet-component-provider";
import { MarkRequestSheetForm, MarkRequestSheetFormHeader } from "@/view/components/forms/mark/request/mark-request";
import type { useSettingCellActionParams } from "./setting-cell-action";

export function useSettingCellActionRequest({ collaborator, dayFlags, date }: useSettingCellActionParams) {
  const requestHasRecord = dayFlags?.workshiftAdjustments?.hasRecords ?? false;
  const { setContentAndOpen } = useContextSheetContentController();
  // const session = useSession()
  // const token = session.data?.user.token ?? ""
  // const facades = useMemo(() => ({
  //   request: requestsFacadeFactory(token),
  //   collaborator: collaboratorsFacadeFactory(token),
  // }), [token])
  // async function getRequestUpdateInitialData(): Promise<MarkRequestFormProps> {
  //   try {
  //     if (!requestHasRecord) throw new Error()
  //     const { data } = await facades.request.findAll({
  //       collaboratorId: collaborator.id,
  //       startDate: timestampDate,
  //       endDate: timestampDate,
  //     })
  //     if (!data?.length) throw new Error()
  //     return {
  //       requests: []
  //     }
  //   } catch {
  //     return {
  //       requests: []
  //     }
  //   }
  // }
  async function openRequestSheet() {
    // const initialData = await getRequestUpdateInitialData()
    setContentAndOpen({
      sheetMinWidth: "410px",
      Header: <MarkRequestSheetFormHeader />,
      Body: (
        <MarkRequestSheetForm
          collaborator={collaborator}
          date={date}
          hasRecord={requestHasRecord}
        />
      ),
    });
  }

  return { openRequestSheet, requestHasRecord }
}
