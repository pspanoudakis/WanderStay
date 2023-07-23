/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-petrol': '#6fb69e',
        'dark-petrol': '#408972',
        'light-petrol': '#b0f1da'
      }
    },
  },
  plugins: [],
}
