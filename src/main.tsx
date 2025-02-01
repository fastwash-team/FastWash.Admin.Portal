import { createRoot } from "react-dom/client";
import "@/styles/index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { OnboardingLayout } from "@/layout/index.tsx";
import LoginPage from "@/pages/LoginPage/index.tsx";
import { Flowbite } from "flowbite-react";
import customTheme from "./theme/index.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <div className="font-display">
    <QueryClientProvider client={queryClient}>
      <Flowbite theme={{ theme: customTheme }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route element={<OnboardingLayout />}>
              <Route path="login" element={<LoginPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Flowbite>
    </QueryClientProvider>
  </div>
);
