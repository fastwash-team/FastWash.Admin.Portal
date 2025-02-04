import { createRoot } from "react-dom/client";
import "@/styles/index.css";
// import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { AuthenticatedLayout, OnboardingLayout } from "@/layout/index.tsx";
import LoginPage from "@/pages/LoginPage/index.tsx";
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
} from "./router/paths.ts";
import VerifyAuthPage from "./pages/VerifyAuthPage/index.tsx";
import DashboardPage from "./pages/DashboardPage/index.tsx";
import RequestsPage from "./pages/RequestsPage/index.tsx";
import SchedulePage from "./pages/SchedulePage/index.tsx";

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
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
              <Route path={ADMIN_SCHEDULE} element={<SchedulePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Flowbite>
    </QueryClientProvider>
  </div>
);
