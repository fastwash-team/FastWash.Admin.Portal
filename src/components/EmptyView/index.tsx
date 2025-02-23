import { LaundryIcon } from "@/assets/LaundryIcon";
import { Button } from "flowbite-react";
import React from "react";

type ComingSoon = {
  title: string;
  description: string;
  btnText: string;
  handleCta: () => void;
  showButton?: boolean;
};
export const EmptyView = ({
  title,
  description,
  btnText,
  handleCta,
  showButton = true,
}: ComingSoon) => {
  return (
    <div className="w-full max-w-[390px] flex items-center justify-center flex-col space-y-4">
      <LaundryIcon />
      <p className="text-[#020D1C] text-center font-semibold text-2xl">
        {title}
      </p>
      <p className="text-[#666666] text-sm text-center">{description}</p>
      {showButton && (
        <Button onClick={handleCta} color="primary" size="lg">
          {btnText}
        </Button>
      )}
    </div>
  );
};
