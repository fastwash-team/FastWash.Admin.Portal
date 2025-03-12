import { SuspenseLoader } from "@/components/SuspenseLoader";
import { lazy, Suspense } from "react";

const PaymentDetailsView = lazy(() =>
  import("@/features/Payments/Details").then(({ PaymentDetailsView }) => ({
    default: PaymentDetailsView,
  }))
);

const RequestDetailsPage = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <PaymentDetailsView />
    </Suspense>
  );
};

export default RequestDetailsPage;
