import { REQUEST_METHODS } from "@/utils/constants";
import { INITIATE_LOGIN, COMPLETE_LOGIN } from "@/services/urls";
import { apiSlice } from "@/store/slices";
import { components } from "@/types/api/fastwashservice";

export const authApiService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    initiateLogin: builder.mutation({
      query: (values: string) => ({
        url: INITIATE_LOGIN,
        method: REQUEST_METHODS.POST,
        body: values,
        transformResponse: (
          response: components["schemas"]["InitiateLoginDTO"]
        ) => response,
      }),
    }),
    completeLogin: builder.mutation({
      query: (values: string) => ({
        url: COMPLETE_LOGIN,
        method: REQUEST_METHODS.POST,
        body: values,
        transformResponse: (
          response: components["schemas"]["CompleteLoginDTO"]
        ) => response,
      }),
    }),
  }),
});

export const { useInitiateLoginMutation, useCompleteLoginMutation } =
  authApiService;
