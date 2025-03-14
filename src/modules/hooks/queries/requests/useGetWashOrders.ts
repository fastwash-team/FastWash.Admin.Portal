import {
  ServiceType,
  WashOrderDTOPaginatedList,
  WashOrdersApi,
  WashStatus,
} from "@/services/fastwash-client";
import { useQuery } from "@tanstack/react-query";
import { useSwaggerApiParams } from "../../use-swagger-api-params";

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
  const swaggerApiParams = useSwaggerApiParams();
  const washOrdersApi = new WashOrdersApi(...swaggerApiParams);

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
          pageSize
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
