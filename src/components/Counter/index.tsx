import React from "react";

type Counter = {
  currentCount: number;
  increment: () => void;
  decrement: () => void;
};

export const Counter = ({ currentCount, increment, decrement }: Counter) => {
  return (
    <div className="w-full max-w-[189px] flex items-center justify-between bg-[#FAFAFA] rounded-3xl">
      <div
        onClick={decrement}
        className="flex cursor-pointer items-center justify-center p-6 w-6 h-6 rounded-full bg-[#FFF8EC] border border-[#FFE6BC]"
      >
        <p className="font-semibold text-xl"> - </p>
      </div>
      <p className="text-[#020D1C] font-semibold text-xl">{currentCount}</p>
      <div
        onClick={increment}
        className="flex cursor-pointer items-center justify-center p-6 w-6 h-6 rounded-full bg-[#FFD59A]"
      >
        <p className="font-semibold text-xl"> + </p>
      </div>
    </div>
  );
};
