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
