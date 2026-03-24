import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { useContextSheetContentController } from "@/application/providers/sheet-content/sheet-component-provider";
import { dateSubmited, parseDateSubmited } from "@/view/components/toaster/date-submited";
import { toastController } from "@/view/components/toaster/toast-controller";
import { toastError } from "@/view/components/toaster/toast-error";
import { Button } from "@/view/components/ui/button";
import { useContextTimeTracking } from "@/view/pages/timetracking/provider/time-tracking-provider";
import { Settings } from "lucide-react";
import { toast } from "sonner";
import type { useSettingCellActionParams } from "./setting-cell-action";

export function useSettingCellActionDayoff({ dayFlags, date }: useSettingCellActionParams) {
  const { refetchGridValues } = useContextTimeTracking();
  const { setModalAndOpen, resetModal } = useModal()
  const { reset } = useContextSheetContentController();
  // const session = useSession()
  // const user = session.data?.user
  // const token = user?.token ?? ""
  // const companyId = user?.companyId ?? ""
  // const facades = useMemo(() => ({
  //   holiday: holidaysFacadeFactory(token),
  //   collaborator: collaboratorsFacadeFactory(token),
  // }), [token])

  function Icon() {
    return (
      <>
        <div className="w-11 h-11 rounded-lg bg-blue-50 dark:bg-blue-900/10 flex justify-center items-center">
          <Settings className="text-blue-600 w-4 h-4" />
        </div>
        <div>
          <p className="font-semibold">Folga aplicada</p>
          <span className="text-muted-foreground truncate">
            {parseDateSubmited(date)}
          </span>
        </div>
      </>
    );
  }
  function removeDayoffForUser() {
    reset();
    resetModal();
    toast("Folga removido com sucesso!", {
      description: dateSubmited(),
      className: "w-fit right-0",
    });
    refetchGridValues()
  }
  function openModalDayoff() {
    setModalAndOpen({
      title: "Remover ajuste!",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
      content: (
        <div className="w-full flex justify-end gap-2">
          <Button
            className="bg-red-600 text-white"
            variant="destructive"
            onClick={() => removeDayoffForUser()}
          >
            Confirmar
          </Button>
          <Button variant="outline">Cancelar</Button>
        </div>
      ),
    });
  }

  async function applyDayoff() {
    try {
      toastController.custom({
        Component: <Icon />,
        action: {
          label: "Desfazer",
          onClick: () => { },
        },
      });
      refetchGridValues()
    } catch {
      toastError({
        tittle: "Erro de servidor"
      })
    }
  }
  const dayoffHasRecord = dayFlags?.dayOff?.hasRecords ?? false;
  function caseDayoff() {
    if (dayoffHasRecord) return openModalDayoff();
    return applyDayoff();
  }

  return { caseDayoff, dayoffHasRecord }
}
