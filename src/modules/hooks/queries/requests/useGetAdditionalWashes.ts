import {
  AdditionalWashOrderDTO,
  WashOrdersApi,
} from "@/services/fastwash-client";
import { useQuery } from "@tanstack/react-query";
import { useSwaggerApiParams } from "../../use-swagger-api-params";

export type ApiResponse = {
  responseObject: AdditionalWashOrderDTO;
  statusCode: string;
  statusMessage: string;
  successful: boolean;
};

export const QUERY_KEY_GET_ADDITIONAL_WASHES = "Get Additional Washes";

export const useGetAdditionalWashes = ({ id }: { id: number }) => {
  const swaggerApiParams = useSwaggerApiParams();
  const washOrdersApi = new WashOrdersApi(...swaggerApiParams);

  return useQuery({
    queryKey: [QUERY_KEY_GET_ADDITIONAL_WASHES],
    queryFn: async () => {
      const res =
        await washOrdersApi.apiWashOrdersOrderIdAdditionalorderInternalGet(id);
      return res?.data as ApiResponse;
    },
    refetchOnWindowFocus: false,
    staleTime: 0,
  });
};
