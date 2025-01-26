const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      backgroundColor: {
        milk: "#FFF8EC",
      },
      colors: {
        fastWashBlack: "#020D1C",
      }
    },
  },
  plugins: [flowbite.plugin()],
};
