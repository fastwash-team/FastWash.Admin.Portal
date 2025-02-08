interface IOption {
  label: string;
  value: string;
}

interface ICustomTagSelection {
  options: IOption[];
  value: string;
  onSelectItem: (value: string) => void;
}

import { Button } from "flowbite-react";

const CustomTagSelection: React.FC<ICustomTagSelection> = ({
  options,
  value,
  onSelectItem,
}) => {
  return (
    <div className="flex gap-2 items-center">
      {options.map((option) => (
        <Button
          onClick={() => onSelectItem(option.value)}
          key={option.value}
          color={option.value === value ? "primary" : "outline"}
          size="sm"
          className="rounded-4xl"
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};

export default CustomTagSelection;
