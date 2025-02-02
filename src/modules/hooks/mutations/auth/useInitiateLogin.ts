import {
  AuthenticationApi,
  InitiateLoginDTO,
} from "@/services/fastwash-client";
import { useMutation } from "@tanstack/react-query";

export type InitiateLoginTypeResponse = {
  responseObject: string;
  statusCode: string;
  statusMessage: string;
  successful: boolean;
};

export const useInitiateLogin = () => {
  const authenticationApi = new AuthenticationApi();

  return useMutation({
    mutationFn: async (data: InitiateLoginDTO) => {
      const res =
        await authenticationApi.apiAuthenticationLoginInitiatePost(data);
      return res.data;
    },
    onSuccess: (res) => {
      return res;
    },
    onError: () => {},
  });
};
