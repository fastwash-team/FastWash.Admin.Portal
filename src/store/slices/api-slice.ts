import { API_URL } from "@/utils/constants";
import { getCookie, handleLogoutRedirect } from "@/utils/libs";
import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${API_URL}/api`,
  credentials: "same-origin",
  prepareHeaders: (headers) => {
    const token = getCookie("_tk");

    headers.set("Access-Control-Allow-Origin", "*");
    if (token) {
      headers.set("Content-Type", `application/json`);
      headers.set("Authorization", `Bearer`);
      headers.set("token", token);
    }
    return headers;
  },
  validateStatus: (response) => {
    if (response.status === 401) {
      if (typeof globalThis.window !== "undefined") {
        handleLogoutRedirect();
      }
    }

    return response.status >= 200 && response.status < 300;
  },
}) as BaseQueryFn<string | FetchArgs, unknown, unknown, object>;

export const apiSlice = createApi({
  reducerPath: "api-slice",
  baseQuery,
  tagTypes: [],
  endpoints: () => ({}),
});
