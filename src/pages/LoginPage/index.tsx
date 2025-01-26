import { OnboardingLayout } from "@/layout";
import React from "react";

const LoginPage = () => {
  return (
    <OnboardingLayout>
      <div className="flex flex-col w-full space-y-8">
        <div className="flex flex-col w-full">
            <p className="font-semibold text-4xl "> Login </p>

        </div>

      </div>
    </OnboardingLayout>
  );
};

export default LoginPage;
