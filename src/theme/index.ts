import { CustomFlowbiteTheme } from "flowbite-react";

const customTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      primary:
        "bg-primary text-white font-bold hover:bg-primary/50 cursor-pointer",
      outline: "bg-[#FAFAFA] border border-[#EDEFF2] cursor-pointer",
    },
    spinnerLeftPosition: {
      xs: "left-2",
      sm: "left-3",
      md: "left-4",
      lg: "left-5",
      xl: "left-6",
    },
  },
  textInput: {
    field: {
      input: {
        colors: {
          gray: "focus:border-primary focus:ring-primary border border-[#D9D9D9]",
        },
        sizes: {
          sm: "p-2 sm:text-xs",
          md: "p-2.5 ext-sm",
          lg: "p-3.5 sm:text-base",
        },
      },
    },
  },
  label: {
    root: {
      base: "font-medium text-black text-sm block mb-2",
    },
  },
  modal: {
    root: {
      show: {
        on: "bg-black/70 flex",
      },
    },
    header: {
      base: "flex items-start justify-between rounded-t border-b border-[#D9D9D9] px-5 py-4",
      title: "text-xl font-semibold",
    },
  },
};

export default customTheme;
