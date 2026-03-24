import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useQueryState } from "nuqs";
import { useInfinityQueryContext } from "../providers/infinity-pagination/infinity-provider";

export function useInvalidateQueryAndRefetch<T>(queryKey: string) {
  const client = useQueryClient()
  const { query } = useInfinityQueryContext<T>()
  const companyId = useSession().data?.user.companyId ?? "";

  const [status] = useQueryState("status", {
    history: "replace",
    shallow: true,
    clearOnDefault: false,
  });
  const [name] = useQueryState("name", {
    history: "replace",
    shallow: true,
    clearOnDefault: false,
  });

  async function invalidateQueryAndRefetch() {
    await client.invalidateQueries({
      queryKey: [queryKey, status, name, companyId],
      exact: false,
      refetchType: "active",
    });
    query?.refetch()
  }

  async function invalidateSelects() {
    await client.invalidateQueries({
      queryKey: ["select-options"],
      refetchType: "active",
    });
    await client.invalidateQueries({
      queryKey: ["multi-select-options"],
      refetchType: "active",
    });
    query?.refetch()
  }


  return { invalidateQueryAndRefetch, invalidateSelects }
}
