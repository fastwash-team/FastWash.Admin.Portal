// import { TransactionTag } from "@/services/fastwash-client";
export const IS_APP_LIVE = import.meta.env.PROD;
export const STAGING_HOSTS = ["admin.dev.fastwash.africa"];
export const API_URL =
  IS_APP_LIVE && !STAGING_HOSTS?.includes(window.location.host)
    ? import.meta.env.VITE_APP_API_LIVE_URL
    : import.meta.env.VITE_APP_API_DEV_URL;

export const REQUEST_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
  HEAD: "HEAD",
  OPTIONS: "OPTIONS",
};

export const timeslots = [
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
];

export enum UserType {
  Customer = 1,
  Operations,
  SuperAdmin,
  Influencer,
}

export enum TransactionChannel {
  Paystack = 1,
  Opay,
  Wallet,
}

export const PAYMENT_TYPES = {
  WALLET: "wallet",
  PAYSTACK: "paystack",
  OPAY: "opay",
  PAY_FOR_ME: "pay-for-me",
};
export const TRANSACTION_TAG_ENUM = {
  MainOrder: 1,
  AdditionalOrder: 2,
};

export enum WashStatus {
  Pending = 1,
  Received,
  Pickup,
  Washing,
  Drying,
  Folding,
  Delivering,
  Completed,
}

export enum ServiceType {
  PreScheduledWash = 1,
  ClassicWash,
}

export const supportedAreas = [
  "Yaba/Shomolu",
  "Lekki Phase I",
  "Surulere",
  "Maryland Ikeja",
  "Gbagada",
  "Ikoyi/VI",
];

export const currencies = {
  1: "\u20A6",
  2: "\u0024",
  3: "\u00A3",
  4: "\u20AC",
  5: "\u00A5",
  6: "₵",
  CNY: "元",
  NGN: "\u20A6",
  RMB: "元",
  USD: "\u0024",
  GBP: "\u00A3",
  EUR: "\u20AC",
};

export const WASH_PRICES = {
  LOGISTICS: 1000,
  WASH: 3500,
  TWO_WASHES: 6100,
  SOFTENER: 350,
  BLEACH: 300,
  COLOR_CATCHER: 500,
  EXTRA_DETERGENT: 350,
  E_LAUNDRY_BAGS: 3000,
  X_LAUNDRY_BAGS: 5500,
  EXTRA_WASH: 2200,
  DRYER_SHEETS: 350,
};
