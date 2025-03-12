import { SuspenseLoader } from "@/components/SuspenseLoader";
import { lazy, Suspense } from "react";

const Verify = lazy(() =>
  import("@/features/VerifyAuth/Verify").then(({ Verify }) => ({
    default: Verify,
  }))
);

const VerifyAuthPage = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <Verify />
    </Suspense>
  );
};

export default VerifyAuthPage;
