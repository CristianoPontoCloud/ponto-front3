import { useWebSocketAdapter } from "@/application/adapters/web-socket/use-web-socket-adapter";
import { timetrackingFacadeFactory } from "@/application/factories/timetracking-facade-factory";
import type { MarkDailyResponse } from "@/domain/entities/marks/mark-view-daily-data";
import type { MarkTimetrackingResponse } from "@/domain/entities/marks/mark-view-timetracking-data";
import type { TimetrackingMonthlyResponse } from "@/domain/entities/time-tracking/grids/mothly";
import { TimeTrackingTypeEnum } from "@/domain/entities/time-tracking/header-form";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import type { TimeTrackingFormContextProps } from "./time-tracking-provider-type";

type MonthlyResponse = TimetrackingMonthlyResponse[]
type DailyResponse = MarkDailyResponse
export function useTimeTrackingProviderWebsoketConsumer({
  setMonthlyResponse,
  setDailyResponse,
  setTimetrackingResponse,
  headerForm,
  collaboratorId,
  typeQueryState,
  setDailyIsLoading,
  setMonthlyIsLoading,
  setTimetrackingIsLoading,
  collaboratorsQuery,
}: Omit<TimeTrackingFormContextProps, 'refetchGridValues'>) {
  const user = useSession().data?.user;
  const token = user?.token ?? "";
  const companyId = user?.companyId ?? "";
  const timetrackingFacade = useMemo(() => timetrackingFacadeFactory(token), [token]);
  const websocketAdapter = useWebSocketAdapter()
  const firstCollaborator = collaboratorsQuery?.data?.[0].id ?? ""

  const { getValues, setValue, watch } = headerForm

  // --- LATEST REF PATTERN ---
  // Guardamos tudo que o lint reclama aqui dentro
  const latest = useRef({
    setMonthlyResponse,
    setDailyResponse,
    setTimetrackingResponse,
    setDailyIsLoading,
    setMonthlyIsLoading,
    setTimetrackingIsLoading,
    timetrackingFacade,
    websocketAdapter,
    collaboratorId,
    typeQueryState,
    firstCollaborator,
    getValues,
    setValue
  });

  // Atualizamos o ref em cada renderização para garantir que as funções usem valores novos
  latest.current = {
    setMonthlyResponse,
    setDailyResponse,
    setTimetrackingResponse,
    setDailyIsLoading,
    setMonthlyIsLoading,
    setTimetrackingIsLoading,
    timetrackingFacade,
    websocketAdapter,
    collaboratorId,
    typeQueryState,
    firstCollaborator,
    getValues,
    setValue
  };

  const setFirstCollaboratorIdIntoForm = useCallback(() => {
    const {
      getValues,
      setValue,
      firstCollaborator
    } = latest.current;
    const collaboratorId = getValues("collaboratorId")
    if (collaboratorId === "") {
      setValue("collaboratorId", firstCollaborator)
    }
  }, [])
  const subscribeAndBindTimetracking = useCallback(async () => {
    const {
      setTimetrackingIsLoading, collaboratorId, getValues,
      timetrackingFacade, websocketAdapter, setTimetrackingResponse
    } = latest.current;
    setFirstCollaboratorIdIntoForm()
    setTimetrackingIsLoading(true)
    if (collaboratorId === "") {
      setTimetrackingIsLoading(false)
      return
    }
    const data = getValues()
    const response = await timetrackingFacade.calculate(data)
    const channelName = response?.data?.socketChannel
    if (channelName === undefined) return
    const socket = websocketAdapter.connectAndListen<MarkTimetrackingResponse>({
      eventCallback({ data }) {
        setTimetrackingResponse(data)
        setTimetrackingIsLoading(false)
      },
      channelName
    })
    return () => {
      if (socket) {
        websocketAdapter.disconect(socket);
      }
    }
  }, [setFirstCollaboratorIdIntoForm]);

  const subscribeAndBindDaily = useCallback(async () => {
    const {
      setDailyIsLoading, getValues,
      timetrackingFacade, websocketAdapter, setDailyResponse
    } = latest.current;
    setFirstCollaboratorIdIntoForm()
    setDailyIsLoading(true)
    const data = getValues()
    const response = await timetrackingFacade.dailyCalculate(data)
    const channelName = response?.data?.socketChannel
    if (channelName === undefined) return
    const socket = websocketAdapter.connectAndListen<DailyResponse>({
      channelName,
      eventCallback({ data }) {
        setDailyResponse(data)
        setDailyIsLoading(false)
      }
    })
    return () => {
      if (socket) {
        websocketAdapter.disconect(socket);
      }
    };
  }, [setFirstCollaboratorIdIntoForm]);

  // function deltaMs(start: number) {
  //   const end = performance.now();
  //   return end - start
  // }

  const subscribeAndBindMonthly = useCallback(async () => {
    // const start = performance.now();
    // console.log("inicio de execução subscribeAndBindMonthly", deltaMs(start))
    const {
      setMonthlyIsLoading, getValues,
      timetrackingFacade, websocketAdapter, setMonthlyResponse
    } = latest.current;
    setMonthlyIsLoading(true)
    const data = getValues()
    // console.log("antes calculo", deltaMs(start))
    const response = await timetrackingFacade.monthlyCalculate(data)
    // console.log("depois calculo", deltaMs(start))
    const channelName = response?.data?.socketChannel
    if (channelName === undefined) return
    // console.log("websocker inicio", deltaMs(start))
    const socket = websocketAdapter.connectAndListen<MonthlyResponse>({
      channelName,
      eventCallback({ data }) {
        // console.log("callback inicio", deltaMs(start))
        setMonthlyResponse(data)
        setMonthlyIsLoading(false)
        // console.log("callback fim ", deltaMs(start))
      }
    })
    // console.log("websocker fim ", deltaMs(start))
    return () => {
      if (socket) {
        websocketAdapter.disconect(socket);
      }
    };
  }, []);

  const refetchGridValues = useCallback(async () => {
    const { daily, monthly, timetracking } = TimeTrackingTypeEnum;
    const subscribeUseCase: Record<TimeTrackingTypeEnum, () => Promise<void>> = {
      [monthly]: async () => { await subscribeAndBindMonthly() },
      [daily]: async () => { await subscribeAndBindDaily() },
      [timetracking]: async () => { await subscribeAndBindTimetracking() },
    }
    if (!subscribeUseCase[typeQueryState as TimeTrackingTypeEnum]) {
      return
    }
    await subscribeUseCase[typeQueryState as TimeTrackingTypeEnum]()
  }, [
    typeQueryState,
    subscribeAndBindMonthly,
    subscribeAndBindDaily,
    subscribeAndBindTimetracking
  ])
  const dateTo = watch("dateTo");
  const dateFrom = watch("dateFrom");
  const dailyDate = watch("dailyDate");
  const monthlyDate = watch("monthlyDate")
  useEffect(() => {
    refetchGridValues();
    // refetchGridValues is intentionally excluded - it would cause effect to run every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, companyId, collaboratorId, typeQueryState, dateTo, dateFrom, dailyDate, monthlyDate]);
  return {
    subscribeAndBindTimetracking,
    subscribeAndBindDaily,
    subscribeAndBindMonthly,
    refetchGridValues
  }
}
