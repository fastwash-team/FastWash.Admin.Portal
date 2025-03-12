import { AuthHeader } from "../../components/Header/AuthHeader";
import { Outlet } from "react-router";

const OnboardingLayout = () => {
  return (
    <div className="w-full max-w-screen h-full max-h-screen bg-white flex flex-col space-y-10">
      <AuthHeader />
      <div className="flex flex-col w-full max-w-[600px] mx-auto px-3">
        <Outlet />
      </div>
    </div>
  );
};

export default OnboardingLayout;
