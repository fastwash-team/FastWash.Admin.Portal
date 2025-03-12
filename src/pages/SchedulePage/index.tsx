import { SuspenseLoader } from "@/components/SuspenseLoader";
import { lazy, Suspense } from "react";

const ScheduleView = lazy(() =>
  import("@/features/Schedule/ScheduleView").then(({ ScheduleView }) => ({
    default: ScheduleView,
  }))
);

const SchedulePage = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <ScheduleView />
    </Suspense>
  );
};

export default SchedulePage;
