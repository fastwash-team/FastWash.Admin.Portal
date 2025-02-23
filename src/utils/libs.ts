import { ADMIN_LOGIN } from "@/router/paths";
// import { AxiosError } from "axios";
import dayjs from "dayjs";
// import { toast } from "sonner";
import Cookies from "js-cookie";
import { WASH_PRICES } from "./constants";

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

export const formatMoney = (value: number) =>
  new Intl.NumberFormat("en-US", {}).format(value);

export const getWashServiceType = (washType: string | number | undefined) => {
  if (washType === "PreScheduledWash") return "Pre Scheduled";
  if (washType === "Classic" || washType === "ClassicWash") return "Classic";
};

export const calculateWashPrice = (washCount: number) => {
  let price = 0;
  // 1 wash = 3500, 2 washes = 6100, 3 washes = 2 washes + 1 wash
  const washCountIsEven = washCount % 2 === 0;
  if (washCount === 1) {
    price = WASH_PRICES.WASH;
  } else if (washCount === 2) {
    price = WASH_PRICES.TWO_WASHES;
  } else if (washCount > 2) {
    const absoluteRounds = Math.floor(washCount / 2); // how many absolute rounds rounds
    price = absoluteRounds * WASH_PRICES.TWO_WASHES;
    if (!washCountIsEven) {
      price += WASH_PRICES.WASH;
    }
  }
  return price;
};

export const calculatePrice = ({
  name,
  count,
}: {
  name: string;
  count: number;
}) => {
  let price = 0;
  if (name?.toLowerCase() === "softner") {
    price = count * WASH_PRICES.SOFTENER;
  } else if (name?.toLowerCase() === "bleach") {
    price = count * WASH_PRICES.BLEACH;
  } else if (name?.toLowerCase() === "color catcher") {
    price = count * WASH_PRICES.COLOR_CATCHER;
  } else if (name?.toLowerCase() === "extra detergent") {
    price = count * WASH_PRICES.EXTRA_DETERGENT;
  } else if (name?.toLowerCase() === "dryer sheets") {
    price = count * WASH_PRICES.DRYER_SHEETS;
  } else if (name?.toLowerCase() === "laundry bags (e)") {
    price = count * WASH_PRICES.E_LAUNDRY_BAGS;
  } else if (name?.toLowerCase() === "laundry bags (x)") {
    price = count * WASH_PRICES.X_LAUNDRY_BAGS;
  }
  return price;
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
