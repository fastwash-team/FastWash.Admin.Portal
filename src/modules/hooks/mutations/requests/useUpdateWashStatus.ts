import {
  WashOrdersApi,
  WashOrderStatusUpdateDTO,
} from "@/services/fastwash-client";
import { useMutation } from "@tanstack/react-query";
import { useSwaggerApiParams } from "../../use-swagger-api-params";

export const useUpdateWashStatus = () => {
  const swaggerApiParams = useSwaggerApiParams();
  const washOrdersApi = new WashOrdersApi(...swaggerApiParams);

  return useMutation({
    mutationFn: async (data: WashOrderStatusUpdateDTO) => {
      const res = await washOrdersApi.apiWashOrdersOrderStatusPut(data);
      return res.data;
    },
    onSuccess: (res) => {
      return res;
    },
    onError: () => {},
  });
};
