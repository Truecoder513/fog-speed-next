/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tranparentBlack: "#00000070",
      },
      screens: {
        xl: { max: "1280px" },
        lg: { max: "1024px" },
        mlg: { max: "1050px" },
        md: { max: "968px" },
        sm: { max: "640px" },
      },
    },
  },
  plugins: [],
};
