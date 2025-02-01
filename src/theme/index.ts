import { CustomFlowbiteTheme } from "flowbite-react";

const customTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      primary: "bg-primary text-white font-bold hover:bg-primary/50",
    },
  },
  textInput: {
    field: {
      input: {
        colors: {
          gray: "focus:border-primary focus:ring-primary ",
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
};

export default customTheme;
