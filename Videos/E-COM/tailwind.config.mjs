import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"], // Use Poppins as default sans-serif
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#3F6075",       // Primary color
          "secondary": "#f000b8",     // Secondary color
          "accent": "#37cdbe",        // Accent color
          "neutral": "#f7f7f7",       // Neutral color
          "base-100": "#ffffff",      // Base background color
          "info": "#3abff8",          // Info color
          "success": "#36d399",       // Success color
          "warning": "#FAB12F",       // Warning color
          "error": "#f87272",         // Error color
        },
      },
    ],
  },
};