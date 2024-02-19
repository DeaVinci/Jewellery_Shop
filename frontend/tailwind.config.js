/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
      brown: "#825F45",
      green: "#797D62",
      orange: "#D08C60",
      yellow: "#FFCB69",
      beaver: "#997B66"
    }
  },
  },
  plugins: [require("daisyui")],
}

