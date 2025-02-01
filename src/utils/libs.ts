import { ADMIN_LOGIN } from "@/router/paths";
import dayjs from "dayjs";

/**
 *
 * @param  {...any} logs - The argument(s) to be logged
 * @returns {Function | undefined} Returns the native javascript console.log or undefined depending on the environment
 */
export const Logger = (...logs: unknown[]) =>
  process.env.NODE_ENV === "development"
    ? console.log(...logs, `(Log time - ${dayjs().format("LLL")})`)
    : undefined;

export const getCookie = (name: string) => {
  const value = typeof window !== "undefined" ? `; ${document.cookie}` : "";
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

/**
 * @param cname
 * @param cvalue
 */
export const setCookie = (cname: string, cvalue: string) => {
  return typeof window !== "undefined"
    ? (document.cookie = `${cname}=${cvalue};path=/`)
    : "";
};

export const handleLogoutRedirect = () => {
  if (typeof window !== "undefined") {
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace(ADMIN_LOGIN);
  }
};
