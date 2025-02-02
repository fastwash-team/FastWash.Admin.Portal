import {
  AuthenticationApi,
  CompleteLoginDTO,
} from "@/services/fastwash-client";
import { useMutation } from "@tanstack/react-query";

export type CompleteLoginDto = {
  access_token: string;
  expires_in: string;
  token_type: string;
};

export type CompleteLoginTypeResponse = {
  responseObject: CompleteLoginDto;
  statusCode: string;
  statusMessage: string;
  successful: boolean;
};

export const useCompleteLogin = () => {
  const authenticationApi = new AuthenticationApi();

  return useMutation({
    mutationFn: async (data: CompleteLoginDTO) => {
      const res =
        await authenticationApi.apiAuthenticationLoginCompletePut(data);
      return res.data;
    },
    onSuccess: (res) => {
      return res;
    },
    onError: () => {},
  });
};
