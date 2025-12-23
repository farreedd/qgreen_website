/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        qgreen: {
          blue: "#0F5AA6",
          blueDark: "#0B3C6D",
          green: "#8CC63E",
          bgBlue: "#EEF5FB",
          bgGreen: "#EAF6E6",
          textPrimary: "#1F2937",
          textSecondary: "#4B5563",
          border: "#E5E7EB",
        },
      },
    },
    plugins: [],
  }
};
