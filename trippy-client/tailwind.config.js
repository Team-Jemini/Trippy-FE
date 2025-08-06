/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Spoqa Han Sans Neo"', "sans-serif"],
      },
      colors: {
        black: "#1A1E23",
        gray: {
          100: "#F4F5F7",
          200: "#E8EAED",
          300: "#CBD0D7",
          400: "#919BAB",
          500: "#5D687A",
          600: "#313740",
        },
        white: "#FFFFFF",
        blue: {
          100: "#F3F5F7",
          200: "#E6EEFF",
          300: "#9DB1DD",
          400: "#236FFF",
        },
        purple: "#938AFF",
        red: {
          100: "#FCEDED",
          200: "#FF4242",
        },
        green: {
          100: '#E5F4E6',
          200: "#2AC430",
        },
      },
      backgroundImage: {
        "main-gradient":
          "linear-gradient(152.02deg, #6AE4FF -45.76%, #236FFF 25.9%, #236FFF 50.94%, #A38EFF 120.01%)",
        "header-gradient":
          "linear-gradient(90deg, #6AE4FF 0%, #236FFF 43.23%, #236FFF 58.33%, #A38EFF 100%)",
      },
    },
    fontSize: {
      xxs: "0.6875rem", // 11pt
      xs: "0.75rem", // 12pt
      sm: "0.875rem", // 14pt
      md: "1rem", // 16pt
      lg: "1.125rem", // 18pt
      xl: "1.25rem", // 20pt
      xxl: "1.5rem", // 24pt
    },
  },
  plugins: [],
};
