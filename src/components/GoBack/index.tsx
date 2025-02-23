import React from "react";
import { IoMdArrowBack } from "react-icons/io";

type GoBackProps = {
  onClick: () => void;
};
export const GoBack = ({ onClick }: GoBackProps) => {
  return (
    <div className="cursor-pointer" onClick={onClick}>
      <IoMdArrowBack size="20" />
    </div>
  );
};
