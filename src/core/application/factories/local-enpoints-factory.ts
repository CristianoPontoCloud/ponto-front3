import { createLocalApi } from "@/infra/adapters/local-api";
import { LocalEndpoint, type LocalEndpointDto } from "@/infra/apis/local-endpoints";

export function localEndpointsFactory(): LocalEndpointDto {
  const endpoint = createLocalApi()
  return new LocalEndpoint(endpoint)
}
