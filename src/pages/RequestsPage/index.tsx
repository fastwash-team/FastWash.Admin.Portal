import { SuspenseLoader } from "@/components/SuspenseLoader";
import { lazy, Suspense } from "react";

const RequestsView = lazy(() =>
  import("@/features/Requests/RequestsView").then(({ RequestsView }) => ({
    default: RequestsView,
  }))
);
const RequestsPage = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <RequestsView />
    </Suspense>
  );
};

export default RequestsPage;
