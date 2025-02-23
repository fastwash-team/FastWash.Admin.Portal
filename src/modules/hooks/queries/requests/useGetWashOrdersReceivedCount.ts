import {
  WashOrderReceivedCountDTO,
  WashOrdersApi,
} from "@/services/fastwash-client";
import { fastWashCookies } from "@/utils/libs";
import { useQuery } from "@tanstack/react-query";

const Cookies = fastWashCookies();

export type ApiResponse = {
  responseObject: WashOrderReceivedCountDTO;
  statusCode: string;
  statusMessage: string;
  successful: boolean;
};

export const QUERY_KEY_GET_WASH_ORDERS_RECEIVED_COUNT =
  "Get Washed Orders Received Count";

export const useGetWashOrdersReceivedCount = () => {
  const washOrdersApi = new WashOrdersApi();

  return useQuery({
    queryKey: [QUERY_KEY_GET_WASH_ORDERS_RECEIVED_COUNT],
    queryFn: async () => {
      const res = await washOrdersApi.apiWashOrdersOrderReceivedCountGet({
        headers: { Authorization: `Bearer ${Cookies.get("tk")}` },
      });
      return res?.data as ApiResponse;
    },
    refetchOnWindowFocus: false,
    staleTime: 0,
  });
};
