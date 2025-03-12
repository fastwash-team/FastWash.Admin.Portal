import { SuspenseLoader } from "@/components/SuspenseLoader";
import { lazy, Suspense } from "react";
const PaymentsView = lazy(() =>
  import("@/features/Payments/PaymentsView").then(({ PaymentsView }) => ({
    default: PaymentsView,
  }))
);

const PaymentsPage = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <PaymentsView />
    </Suspense>
  );
};

export default PaymentsPage;
