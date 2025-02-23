import {
  ServiceType,
  WashOrderDTOPaginatedList,
  WashOrdersApi,
  WashStatus,
} from "@/services/fastwash-client";
import { fastWashCookies } from "@/utils/libs";
import { useQuery } from "@tanstack/react-query";

const Cookies = fastWashCookies();

export type GetWashOrdersApiResponse = {
  responseObject: WashOrderDTOPaginatedList;
  statusCode: string;
  statusMessage: string;
  successful: boolean;
};

export type GetWashOrdersInput = {
  location?: string;
  orderNotes?: string;
  fromOrderAmount?: number;
  toOrderAmount?: number;
  washStatus?: WashStatus;
  serviceType?: ServiceType;
  orderStartDate?: string;
  orderEndDate?: string;
  pageIndex?: number;
  pageSize?: number;
};

export const QUERY_KEY_GET_WASH_ORDERS = "Get Washed Orders";
export const useGetWashOrders = ({
  location,
  orderNotes,
  fromOrderAmount,
  toOrderAmount,
  washStatus,
  serviceType,
  orderStartDate,
  orderEndDate,
  pageIndex,
  pageSize,
}: GetWashOrdersInput) => {
  const washOrdersApi = new WashOrdersApi();

  return useQuery({
    queryKey: [
      QUERY_KEY_GET_WASH_ORDERS,
      location,
      orderNotes,
      fromOrderAmount,
      toOrderAmount,
      washStatus,
      serviceType,
      orderStartDate,
      orderEndDate,
      pageIndex,
      pageSize,
    ],
    queryFn: async () => {
      try {
        const res = await washOrdersApi.apiWashOrdersFilterGet(
          location,
          orderNotes,
          fromOrderAmount,
          toOrderAmount,
          washStatus,
          serviceType,
          orderStartDate,
          orderEndDate,
          pageIndex,
          pageSize,
          {
            headers: { Authorization: `Bearer ${Cookies.get("tk")}` },
          }
        );
        return res?.data as GetWashOrdersApiResponse;
      } catch (error) {
        return error;
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 0,
  });
};
