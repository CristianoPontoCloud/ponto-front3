import { delimitationsFacadeFactory } from "@/application/factories/delimitations-facade-factory";
import { useModal } from "@/application/providers/modal-provider/modal-provider";
import type { DelimitationFormType } from "@/domain/entities/delimitation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";

export function useDelimitationProviderSetup() {
  const { setModalAndOpen, resetModal } = useModal();
  const user = useSession().data?.user;
  const token = user?.token ?? "";
  const delimitationFacade = useMemo(() => delimitationsFacadeFactory(token), [token]);
  const queryKey = ["delimitations", token]
  const delimitationsQuery = useQuery({
    queryKey,
    queryFn: async () => await delimitationFacade.findAllByCompanyId(),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: Number.POSITIVE_INFINITY,
  });
  const client = useQueryClient()
  async function invalidateQueryAndRefetch() {
    await client.invalidateQueries({
      queryKey,
      exact: true,
      refetchType: "active",
    });
    delimitationsQuery?.refetch()
  }
  const companyId = user?.companyId ?? "";
  const [type, setType] = useState<DelimitationFormType>("address");
  const [openSheetDelimitation, setOpenSheetDelimitation] = useState<boolean>(false);
  return {
    invalidateQueryAndRefetch,
    delimitationsQuery,
    companyId,
    type,
    setType,
    openSheetDelimitation,
    setOpenSheetDelimitation,
    setModalAndOpen,
    resetModal,
    delimitationFacade
  }
}
