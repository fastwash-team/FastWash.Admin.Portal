import { SuspenseLoader } from "@/components/SuspenseLoader";
import { lazy, Suspense } from "react";
const DashboardView = lazy(() =>
  import("@/features/Dashboard/DashboardView").then(({ DashboardView }) => ({
    default: DashboardView,
  }))
);
const DashboardPage = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <DashboardView />
    </Suspense>
  );
};

export default DashboardPage;
