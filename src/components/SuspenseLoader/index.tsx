import { Spinner } from "flowbite-react";

export const SuspenseLoader = () => {
  return (
    <div className="w-full h-[500px] flex flex-col items-center justify-center bg-white space-y-4">
      <Spinner aria-label="Loading" size="xl" />
      <p className="text-xs text-[#020D1C]">Loading</p>
    </div>
  );
};
