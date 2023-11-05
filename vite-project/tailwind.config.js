/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-orange': '#d98c00',
        'theme-red': "#d52540",
        'theme-green': "#5eac00",
        'theme-blue': "#0093d3"
      }
    },
  },
  variants:{
    opacity:['disabled', 'first']
  },
  plugins: [],
}
