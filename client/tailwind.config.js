/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#0a0e27",
          darker: "#050812",
          mid: "#0f1629",
        }
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glow: "0 0 30px rgba(99, 102, 241, 0.2)",
        "glow-lg": "0 0 50px rgba(99, 102, 241, 0.3)",
      }
    },
  },
  plugins: [],
}
