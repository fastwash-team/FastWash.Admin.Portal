import { SuspenseLoader } from "@/components/SuspenseLoader";
import { lazy, Suspense } from "react";

const RequestDetailsView = lazy(() =>
  import("@/features/Requests/Details").then(({ RequestDetailsView }) => ({
    default: RequestDetailsView,
  }))
);

const RequestDetailsPage = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <RequestDetailsView />
    </Suspense>
  );
};

export default RequestDetailsPage;
