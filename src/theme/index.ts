import { CustomFlowbiteTheme } from "flowbite-react";

const customTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      primary:
        "bg-primary text-white font-bold hover:bg-primary/50 cursor-pointer",
      outline:
        "text-[#666] bg-[#FAFAFA] border border-[#EDEFF2] cursor-pointer",
      secondary:
        "text-primary bg-[#F4F4F4] border border-[#EDEFF2] cursor-pointer",
      initiate: "bg-[#D6E7FF] text-[#17499F] cursor-pointer font-bold",
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
      base: "font-semibold text-black text-sm block mb-2",
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
  pagination: {
    base: "mt-0 py-0 flex items-center",
    pages: {
      base: "mt-0 flex items-center gap-2",
      previous: {
        base: "rounded-md cursor-pointer border border-gray-300 bg-white px-3 py-2.5",
      },
      next: {
        base: "rounded-md border cursor-pointer border-gray-300 bg-white px-3 py-2.5",
      },
      selector: {
        base: "w-12 cursor-pointer border border-gray-200 py-2 rounded-md",
        active: "bg-primary text-white px-4",
      },
    },
  },
};

export default customTheme;
