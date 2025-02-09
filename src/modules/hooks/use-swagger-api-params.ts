import axios, { AxiosInstance } from "axios";
import { useMemo } from "react";
import { fastWashCookies } from "@/utils/libs";
import { Configuration } from "@/services/fastwash-client";
import { API_URL } from "@/utils/constants";

const Cookies = fastWashCookies();

const SERVER = axios.create({
  baseURL: API_URL,
});

const useSwaggerConfig = (): Configuration => {
  return useMemo(
    () => ({
      basePath: API_URL,
      isJsonMime(): boolean {
        return false;
      },
      headers: {
        // Added headers property here
        Authorization: `Bearer ${Cookies.get("tk")}`,
      },
    }),
    []
  );
};

export const useSwaggerApiParams = (): [
  Configuration,
  string | undefined,
  AxiosInstance,
] => {
  const config = useSwaggerConfig();
  const apiClient = useMemo<AxiosInstance>(() => SERVER, []);

  apiClient.interceptors.request.use(
    async (config) => {
      if (Cookies) {
        config.headers["Authorization"] = `Bearer ${Cookies.get("tk")}`;
      }

      return config;
    },
    (error) => {
      console.error("Request error:", error);
      return Promise.reject(error);
    }
  );

  return [config, config.basePath, apiClient];
};
