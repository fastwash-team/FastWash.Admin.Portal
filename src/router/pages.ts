// All pages should be lazily imported here
import { lazy } from "react";
// import LoginPage from "@/pages/LoginPage";
// import VerifyAuthPage from "@/pages/VerifyAuthPage";
// import DashboardPage from "@/pages/DashboardPage";

const LoginPage = lazy(async () => await import("@/pages/LoginPage"));
const VerifyAuthPage = lazy(async () => await import("@/pages/VerifyAuthPage"));
const DashboardPage = lazy(async () => await import("@/pages/DashboardPage"));

export { LoginPage, DashboardPage, VerifyAuthPage};
