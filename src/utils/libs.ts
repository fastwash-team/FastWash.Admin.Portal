import { ADMIN_LOGIN } from "@/router/paths";
// import { AxiosError } from "axios";
import dayjs from "dayjs";
// import { toast } from "sonner";
import Cookies from "js-cookie";

/**
 *
 * @param  {...any} logs - The argument(s) to be logged
 * @returns {Function | undefined} Returns the native javascript console.log or undefined depending on the environment
 */
export const Logger = (...logs: unknown[]) =>
  process.env.NODE_ENV === "development"
    ? console.log(...logs, `(Log time - ${dayjs().format("LLL")})`)
    : undefined;

export const handleLogoutRedirect = () => {
  if (typeof window !== "undefined") {
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace(ADMIN_LOGIN);
  }
};

export const fastWashCookies = function () {
  return {
    get: function (name: string) {
      return Cookies.get(name);
    },
    set: function (
      name: string,
      value: string,
      attributes?: { expires: Date; path: string }
    ) {
      Cookies.set(name, value, attributes);
    },
    remove: function (name: string, attributes?: { path: string }) {
      Cookies.remove(name, attributes);
    },
  };
};

export const logoutUser = () => {
  const cookies = fastWashCookies();
  if (typeof window !== "undefined") {
    cookies.remove("tk");
    window.location.replace(ADMIN_LOGIN);
  }
};

// export const errorHandler = (error: AxiosError) => {
//   console.log("response", error.response);
//   if (error?.response?.data?.statusMessage)
//     return error.response.data.statusMessage;
//   if (error?.response?.status === 404) {
//     return "Resource not found. Please contact support!";
//   }
//   if (error?.response?.status === 401) {
//     handleLogoutRedirect();
//     toast
//   }
//   if (error?.message) return error.message;
//   return "Something went wrong. Try again!";
// };
