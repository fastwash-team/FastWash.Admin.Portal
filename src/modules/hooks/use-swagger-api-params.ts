import axios, { AxiosInstance } from "axios";
import { useMemo } from "react";
import { fastWashCookies } from "@/utils/libs";
import { Configuration } from "@/services/fastwash-client";
import { API_URL } from "@/utils/constants";
import { toast } from "sonner";
import { logoutUser } from "@/utils/libs";

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

  apiClient.interceptors.response.use(
    function (response) {
      if (response.status === 401) {
        logoutUser();
        toast.error("Session time-out!");
      }

      if (response.status >= 500) {
        toast.error("Something went wrong!");
      }
      // Do something with response data
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
        logoutUser();
        toast.error("Session time-out!");
      }
      // Do something with response error
      return Promise.reject(error);
    }
  );

  return [config, config.basePath, apiClient];
};
