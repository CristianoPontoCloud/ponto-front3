import type { Request } from "@/domain/entities/request";

export function findRequestName({ requestId, requestList }: { requestId: string, requestList: Request[] }): string {
  return requestList.find(({ id }) => requestId === id)?.name ?? "";
}
