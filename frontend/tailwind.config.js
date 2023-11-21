/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      montserrat: ['Montserrat', 'sans-serif']
    },
    extend: {
      animation: {
        "fade": "fadeOut .2s ease-in-out",
      },
      keyframes: () => ({
        fadeOut: {
          "0%": { opacity: 0, scale: 0 },
          "100%": { opacity: 100, scale: 100 },
        },
      }),
    },
  },
  plugins: [],
}
