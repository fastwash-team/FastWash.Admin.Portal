import {
  WashOrderPlansApi,
  InternalWashOrderPlanDTOPaginatedList,
  ServiceType,
} from "@/services/fastwash-client";
import { useQuery } from "@tanstack/react-query";
import { useSwaggerApiParams } from "../use-swagger-api-params";
import { useSchedulesStore } from "@/modules/stores/schedulesStore";
import { useSearchParams } from "react-router";
import { components } from "@/types/api/fastwashservice";

export type ApiResponse = {
  responseObject: InternalWashOrderPlanDTOPaginatedList;
  statusCode: string;
  statusMessage: string;
  successful: boolean;
};

export type ApiInput = {
  location?: string;
  fromLogisticsAmount?: number;
  toLogisticsAmount?: number;
  serviceType?: components["schemas"]["ServiceType"];
  scheduleStartDate?: string;
  scheduleEndDate?: string;
  pageIndex?: number;
  pageSize?: number;
};

export const QUERY_KEY_GET_SCHEDULES = "Get Schedules";

export const defaultFilters = {
  locations: "",
  fromLogisticsAmount: "0",
  toLogisticsAmount: 4000,
  serviceType: ServiceType.NUMBER_1,
  orderStartDate: undefined,
  orderEndDate: undefined,
  pageIndex: 1,
  pageSize: 10,
  washStatus: "",
  orderNotes: "",
};

export const useGetSchedules = () => {
  const swaggerApiParams = useSwaggerApiParams();
  const schedulesApi = new WashOrderPlansApi(...swaggerApiParams);
  const setSchedules = useSchedulesStore((state) => state.setSchedules);
  const setPageSize = useSchedulesStore((state) => state.setPageSize);
  const setPageCount = useSchedulesStore((state) => state.setPageCount);

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
    searchParams.get("serviceType") ?? defaultFilters.serviceType;
  const scheduleStartDate =
    searchParams.get("orderStartDate") ?? defaultFilters.orderStartDate;
  const scheduleEndDate =
    searchParams.get("orderEndDate") ?? defaultFilters.orderEndDate;
  const pageIndex = Number(
    searchParams.get("pageIndex") ?? defaultFilters.pageIndex
  );
  const pageSize = Number(
    searchParams.get("pageSize") ?? defaultFilters.pageSize
  );

  const query = useQuery({
    queryKey: [QUERY_KEY_GET_SCHEDULES],
    queryFn: async () => {
      try {
        const res = await schedulesApi.apiWashOrderPlansFilterGet(
          location,
          fromLogisticsAmount,
          toLogisticsAmount,
          serviceType as ServiceType,
          scheduleStartDate,
          scheduleEndDate,
          pageIndex,
          pageSize
        );
        const response = res.data as ApiResponse;
        setSchedules(response.responseObject.data);
        setPageCount(response.responseObject.pageCount);
        setPageSize(response.responseObject.pageSize);
        return response.responseObject.data;
      } catch (error) {
        return error;
      }
    },
    refetchOnWindowFocus: false,
  });

  return {
    getSchedules: query.refetch,
    isFetching: query.isFetching,
  };
};
