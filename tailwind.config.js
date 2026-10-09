/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0A1128",
          dark: "#0F172A",
          surface: "#1E293B",
          card: "#162032",
          border: "#334155",
          teal: "#0D9488",
          tealLight: "#14B8A6",
          orange: "#F97316",
          orangeLight: "#FB923C",
          accent: "#38BDF8"
        }
      }
    },
  },
  plugins: [],
}
