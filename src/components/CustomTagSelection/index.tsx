interface IOption {
  label: string;
  value: string | number;
}

interface ICustomTagSelection {
  options: IOption[];
  value: string | number;
  onSelectItem: (value: string | number) => void;
}

import { Button } from "flowbite-react";

const CustomTagSelection: React.FC<ICustomTagSelection> = ({
  options,
  value,
  onSelectItem,
}) => {
  return (
    <div className="flex gap-4 items-center flex-wrap">
      {options.map((option) => (
        <Button
          onClick={() => onSelectItem(option.value)}
          key={option.value}
          color={option.value === value ? "primary" : "outline"}
          size="sm"
          className="rounded-4xl text-nowrap"
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};

export default CustomTagSelection;
