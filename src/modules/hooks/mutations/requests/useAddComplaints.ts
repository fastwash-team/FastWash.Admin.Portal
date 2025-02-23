import {
  WashOrdersApi,
  WashOrderComplaintDTO,
} from "@/services/fastwash-client";
import { useMutation } from "@tanstack/react-query";
import { useSwaggerApiParams } from "../../use-swagger-api-params";

type AddComplaintsPayload = {
  orderId: number;
  data: WashOrderComplaintDTO;
};
export type AddComplaintsResponse = {
  responseObject: string;
  statusCode: string;
  statusMessage: string;
  successful: boolean;
};
export const useAddComplaints = () => {
  const swaggerApiParams = useSwaggerApiParams();
  const washOrdersApi = new WashOrdersApi(...swaggerApiParams);

  return useMutation({
    mutationFn: async ({ orderId, data }: AddComplaintsPayload) => {
      const res = await washOrdersApi.apiWashOrdersOrderIdAddComplaintPut(
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
