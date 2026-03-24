import { collaboratorsFacadeFactory } from "@/application/factories/collaborator/collaborators-facade-factory";
import { holidaysFacadeFactory } from "@/application/factories/registrations/holidays-facade-factory";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import { useContextSheetContentController } from "@/application/providers/sheet-content/sheet-component-provider";
import { StatusDefaultEnum } from "@/domain/usecases/status-default";
import { dateSubmited, parseDateSubmited } from "@/view/components/toaster/date-submited";
import { toastController } from "@/view/components/toaster/toast-controller";
import { toastError } from "@/view/components/toaster/toast-error";
import { Button } from "@/view/components/ui/button";
import { useContextTimeTracking } from "@/view/pages/timetracking/provider/time-tracking-provider";
import { Settings } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { toast } from "sonner";
import type { useSettingCellActionParams } from "./setting-cell-action";

export function useSettingCellActionHoliday({ collaborator, dayFlags, date, timestampDate }: useSettingCellActionParams) {
  const { refetchGridValues } = useContextTimeTracking();
  const { setModalAndOpen, resetModal } = useModal()
  const { reset } = useContextSheetContentController();
  const session = useSession()
  const user = session.data?.user
  const token = user?.token ?? ""
  const companyId = user?.companyId ?? ""
  const facades = useMemo(() => ({
    holiday: holidaysFacadeFactory(token),
    collaborator: collaboratorsFacadeFactory(token),
  }), [token])

  function Icon() {
    return (
      <>
        <div className="w-11 h-11 rounded-lg bg-blue-50 dark:bg-blue-900/10 flex justify-center items-center">
          <Settings className="text-blue-600 w-4 h-4" />
        </div>
        <div>
          <p className="font-semibold">Feriado aplicado</p>
          <span className="text-muted-foreground truncate">
            {parseDateSubmited(date)}
          </span>
        </div>
      </>
    );
  }

  async function applyHoliday() {
    try {
      await facades.holiday.create({
        name: "Feriado criado por apuração",
        collaboratorLinks: [collaborator.id],
        companyId,
        date,
        departmentLinks: [],
        repeatHolidaysAllYears: false,
        status: StatusDefaultEnum.active
      })
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

  async function removeHolidayForUser() {
    try {
      const { data } = await facades.holiday.filtered({
        date: timestampDate,
        status: StatusDefaultEnum.active
      })
      const holidayId = data?.[0]?.id ?? ""
      await facades.holiday.delete(holidayId)
      reset();
      resetModal();
      toast("Feriado removido com sucesso!", {
        description: dateSubmited(),
        className: "w-fit right-0",
      });
      refetchGridValues()
    } catch {
      toastError({
        tittle: "Erro de servidor"
      })
    }
  }

  function openModalHoliday() {
    setModalAndOpen({
      title: "Remover ajuste!",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
      content: (
        <div className="w-full flex justify-end gap-2">
          <Button
            className="bg-red-600 text-white"
            variant="destructive"
            onClick={() => removeHolidayForUser()}
          >
            Confirmar
          </Button>
          <Button variant="outline">Cancelar</Button>
        </div>
      ),
    });
  }

  const holidayHasRecord = dayFlags?.holiday?.hasRecords ?? false;
  function caseHoliday() {
    if (holidayHasRecord) return openModalHoliday();
    return applyHoliday();
  }
  return { caseHoliday, holidayHasRecord }
}
