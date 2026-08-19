/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Poppins'", "system-ui", "sans-serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
      },
      colors: {
        // Pastel teal/blue-green — primary brand spectrum.
        brand: {
          50: "#f1faf7",
          100: "#dcf2ea",
          200: "#b7e4d5",
          300: "#8ad3bd",
          400: "#5cbca2",
          500: "#3aa389",
          600: "#2c8570",
          700: "#256b5b",
          800: "#20554a",
          900: "#1b463e",
        },
        // Soft sky blue — secondary/cool accent.
        mist: {
          50: "#f1f8fc",
          100: "#dcedf7",
          200: "#b7dbef",
          300: "#8bc3e2",
          400: "#5fa6cd",
          500: "#4188b0",
          600: "#316c90",
        },
        // Saffron — warm accent, a nod to the tricolor (used sparingly).
        saffron: {
          50: "#fff8ef",
          100: "#ffecd4",
          200: "#ffd6a3",
          300: "#ffbb6b",
          400: "#ff9f3d",
          500: "#f5891f",
          600: "#d9720f",
          700: "#b25a0c",
        },
        // Deep navy — Ashoka Chakra accent, used only for tiny details.
        chakra: {
          50: "#eef1fb",
          100: "#d6ddf3",
          400: "#3d4f9e",
          500: "#233876",
          600: "#1a2b5c",
        },
      },
      boxShadow: {
        soft: "0 1px 2px rgba(27, 70, 62, 0.04), 0 8px 24px -12px rgba(27, 70, 62, 0.15)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
