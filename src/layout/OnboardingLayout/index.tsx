import { AuthHeader } from "@/components/Header/AuthHeader";
import React from "react";

type Props = {
  children: React.ReactNode;
};
const OnboardingLayout = ({ children }: Props) => {
  return (
    <div className="w-full max-w-screen h-full max-h-screen bg-white flex flex-col space-y-10">
      <AuthHeader />
      <div className="flex flex-col w-full max-w-[600px] mx-auto">
        {children}
      </div>
    </div>
  );
};

export default OnboardingLayout;
