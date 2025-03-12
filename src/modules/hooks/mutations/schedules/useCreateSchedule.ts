import {
  WashOrderPlansApi,
  WashOrderPlanCreationDTO,
} from "../../../../services/fastwash-client";
import { useMutation } from "@tanstack/react-query";
import { useSwaggerApiParams } from "../../use-swagger-api-params";
import { toast } from "sonner";

export const useCreateSchedule = () => {
  const swaggerApiParams = useSwaggerApiParams();
  const scheduleApi = new WashOrderPlansApi(...swaggerApiParams);

  return useMutation({
    mutationFn: async (data: WashOrderPlanCreationDTO) => {
      const res = await scheduleApi.apiWashOrderPlansPost(data);
      return res.data;
    },

    onSuccess: (res) => {
      toast.success("Classic schedules created successfully");
      return res;
    },
    onError: (error) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toast.error((error as any)?.response?.data.statusMessage);
    },
  });
};
