import { SuspenseLoader } from "@/components/SuspenseLoader";
import { lazy, Suspense } from "react";
const SignIn = lazy(() =>
  import("@/features/Login/SignIn").then(({ SignIn }) => ({
    default: SignIn,
  }))
);

const LoginPage = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <SignIn />
    </Suspense>
  );
};

export default LoginPage;
