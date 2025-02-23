import {
  WashOrderReceivedCountDTO,
  WashOrdersApi,
} from "@/services/fastwash-client";
import { useQuery } from "@tanstack/react-query";
import { useSwaggerApiParams } from "../../use-swagger-api-params";

export type ApiResponse = {
  responseObject: WashOrderReceivedCountDTO;
  statusCode: string;
  statusMessage: string;
  successful: boolean;
};

export const QUERY_KEY_GET_WASH_ORDERS_RECEIVED_COUNT =
  "Get Washed Orders Received Count";

export const useGetWashOrdersReceivedCount = () => {
  const swaggerApiParams = useSwaggerApiParams();
  const washOrdersApi = new WashOrdersApi(...swaggerApiParams);

  return useQuery({
    queryKey: [QUERY_KEY_GET_WASH_ORDERS_RECEIVED_COUNT],
    queryFn: async () => {
      const res = await washOrdersApi.apiWashOrdersOrderReceivedCountGet();
      return res?.data as ApiResponse;
    },
    refetchOnWindowFocus: false,
    staleTime: 0,
  });
};
