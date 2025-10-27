// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
       fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },
      keyframes: {
        disco: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "gradient-x": {
          "0%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
          "100%": { "background-position": "0% 50%" },
        },
      },
      animation: {
        'spin-slow': 'spin 4s linear infinite',
        "gradient-x": "gradient-x 15s ease infinite",
      },
    },
  },
  plugins: [],
};

// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "Inter", "Segoe UI", "Arial", "sans-serif"],
      },
    },
  },
};
