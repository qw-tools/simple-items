/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,vue}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1em",
      },
    },
    extend: {},
  },
  plugins: [],
};
