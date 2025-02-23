import { WashOrdersApi, WashOrderUpdateDTO } from "@/services/fastwash-client";
import { useMutation } from "@tanstack/react-query";
import { useSwaggerApiParams } from "../../use-swagger-api-params";

type AddAdditionalWashPayload = {
  orderId: number;
  data: WashOrderUpdateDTO;
};
export type AddExtraWashResponse = {
  responseObject: string;
  statusCode: string;
  statusMessage: string;
  successful: boolean;
};
export const useAddExtraWash = () => {
  const swaggerApiParams = useSwaggerApiParams();
  const washOrdersApi = new WashOrdersApi(...swaggerApiParams);

  return useMutation({
    mutationFn: async ({ orderId, data }: AddAdditionalWashPayload) => {
      const res = await washOrdersApi.apiWashOrdersOrderIdAddAdditionalorderPut(
        orderId,
        data
      );
      return res.data;
    },
    onSuccess: (res) => {
      return res;
    },
    onError: () => {},
  });
};
