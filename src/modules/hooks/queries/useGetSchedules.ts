import {
  ApplicationUserDTO,
  InternalWashOrderPlanDTO,
  ServiceType,
  WashOrderDTO,
  WashOrdersApi,
  WashOrderStatusDTO,
  WashStatus,
} from "@/services/fastwash-client";
import { useQuery } from "@tanstack/react-query";
import { useSwaggerApiParams } from "../use-swagger-api-params";
import { RawAxiosRequestConfig } from "axios";
import { useSchedulesStore } from "@/modules/stores/schedulesStore";
import { useSearchParams } from "react-router";
import dayjs from "dayjs";

export type ApiResponse = {
  responseObject: ApplicationUserDTO;
  statusCode: string;
  statusMessage: string;
  successful: boolean;
};

export const QUERY_KEY_GET_SCHEDULES = "Get Schedules";

const defaultFilters = {
  locations: "",
  fromLogisticsAmount: "0",
  toLogisticsAmount: 4000,
  ServiceType: "",
  orderStartDate: undefined,
  orderEndDate: undefined,
  pageIndex: 1,
  pageSize: 50,
  washStatus: "",
  orderNotes: "",
};

export const useGetSchedules = () => {
  const swaggerApiParams = useSwaggerApiParams();
  const schedulesApi = new WashOrdersApi(...swaggerApiParams);
  const setSchedules = useSchedulesStore((state) => state.setSchedules);
  const [searchParams] = useSearchParams();
  const location = searchParams.get("location") ?? defaultFilters.locations;
  const fromLogisticsAmount = Number(
    searchParams.get("fromLogisticsAmount") ??
      defaultFilters.fromLogisticsAmount
  );
  const toLogisticsAmount = Number(
    searchParams.get("toLogisticsAmount") ?? defaultFilters.toLogisticsAmount
  );
  const serviceType =
    searchParams.get("serviceType") ?? defaultFilters.ServiceType;
  const orderStartDate =
    searchParams.get("orderStartDate") ?? defaultFilters.orderStartDate;
  const orderEndDate =
    searchParams.get("orderEndDate") ?? defaultFilters.orderEndDate;
  const pageIndex = Number(
    searchParams.get("pageIndex") ?? defaultFilters.pageIndex
  );
  const pageSize = Number(
    searchParams.get("pageSize") ?? defaultFilters.pageSize
  );
  const washStatus =
    searchParams.get("washStatus") ?? defaultFilters.washStatus;
  const orderNotes =
    searchParams.get("orderNotes") ?? defaultFilters.orderNotes;

  //    location?: string,
  //    orderNotes?: string,
  //    fromOrderAmount?: number,
  //    toOrderAmount?: number,
  //    washStatus?: WashStatus,
  //    serviceType?: ServiceType,
  //    orderStartDate?: string,
  //    orderEndDate?: string,
  //    pageIndex?: number,
  //    pageSize?: number,

  return useQuery({
    queryKey: [QUERY_KEY_GET_SCHEDULES],
    queryFn: async () => {
      const res = await schedulesApi.apiWashOrdersFilterGet(
        location,
        orderNotes,
        fromLogisticsAmount,
        toLogisticsAmount,
        washStatus,
        serviceType,
        orderStartDate,
        orderEndDate,
        pageIndex,
        pageSize
      );
      setSchedules(res?.data?.responseObject?.data);
      return res?.data as ApiResponse;
    },
    refetchOnWindowFocus: false,
    staleTime: 0,
  });
};
