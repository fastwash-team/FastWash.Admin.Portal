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
