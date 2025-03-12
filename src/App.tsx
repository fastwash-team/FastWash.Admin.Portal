import { BrowserRouter, Route, Routes } from "react-router";
import { AuthenticatedLayout, OnboardingLayout } from "@/layout/index.tsx";
// import LoginPage from "@/pages/LoginPage/index.tsx";
import { Flowbite } from "flowbite-react";
import customTheme from "./theme/index.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import {
  ADMIN_DASHBOARD,
  ADMIN_LOGIN,
  ADMIN_REQUESTS,
  ADMIN_VERIFY_AUTH,
  ADMIN_SCHEDULE,
  ADMIN_REQUEST_DETAILS,
  ADMIN_PAYMENTS,
  ADMIN_PAYMENTS_DETAILS,
} from "./router/paths.ts";
// import VerifyAuthPage from "./pages/VerifyAuthPage/index.tsx";
// import DashboardPage from "./pages/DashboardPage/index.tsx";
// import RequestsPage from "./pages/RequestsPage/index.tsx";
// import SchedulePage from "./pages/SchedulePage/index.tsx";
import "react-loading-skeleton/dist/skeleton.css";
// import RequestDetailsPage from "./pages/RequestsPage/Details/index.tsx";
import { useLayoutEffect } from "react";
import { fastWashCookies } from "./utils/libs.ts";
import { lazy } from "react";

const LoginPage = lazy(async () => await import("@/pages/LoginPage"));
const VerifyAuthPage = lazy(async () => await import("@/pages/VerifyAuthPage"));
const DashboardPage = lazy(async () => await import("@/pages/DashboardPage"));
const RequestsPage = lazy(async () => await import("@/pages/RequestsPage"));
const RequestDetailsPage = lazy(
  async () => await import("@/pages/RequestsPage/Details")
);
const SchedulePage = lazy(async () => await import("@/pages/SchedulePage"));
const PaymentsPage = lazy(async () => await import("@/pages/PaymentsPage"));
const PaymentDetailsPage = lazy(
  async () => await import("@/pages/PaymentsPage/Details")
);

// Create a client
const queryClient = new QueryClient();
function App() {
  const { pathname } = window.location;

  useLayoutEffect(() => {
    const cookies = fastWashCookies();
    const ONBOARDING_ROUTES = [ADMIN_LOGIN, ADMIN_VERIFY_AUTH];

    if (ONBOARDING_ROUTES?.includes(pathname)) {
      cookies.remove("tk");
    }
  }, [pathname]);
  return (
    <div className="font-display">
      <QueryClientProvider client={queryClient}>
        <Flowbite theme={{ theme: customTheme }}>
          <Toaster position="top-right" richColors />
          <BrowserRouter>
            <Routes>
              <Route element={<OnboardingLayout />}>
                <Route path={ADMIN_LOGIN} element={<LoginPage />} />
                <Route path={ADMIN_VERIFY_AUTH} element={<VerifyAuthPage />} />
              </Route>
              <Route element={<AuthenticatedLayout />}>
                <Route path={ADMIN_DASHBOARD} element={<DashboardPage />} />
                <Route path={ADMIN_REQUESTS} element={<RequestsPage />} />
                <Route
                  path={ADMIN_REQUEST_DETAILS}
                  element={<RequestDetailsPage />}
                />
                <Route path={ADMIN_SCHEDULE} element={<SchedulePage />} />
                <Route path={ADMIN_PAYMENTS} element={<PaymentsPage />} />
                <Route
                  path={ADMIN_PAYMENTS_DETAILS}
                  element={<PaymentDetailsPage />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </Flowbite>
      </QueryClientProvider>
    </div>
  );
}

export default App;
