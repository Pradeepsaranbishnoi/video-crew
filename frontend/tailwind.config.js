/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'korean': ['SUIT Variable', 'sans-serif'],
        'english': ['Montserrat', 'sans-serif'],
        'suit': ['SUIT Variable', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      fontWeight: {
        'korean-thin': '100',
        'korean-light': '300',
        'korean-normal': '400',
        'korean-medium': '500',
        'korean-semibold': '600',
        'korean-bold': '700',
        'korean-extrabold': '800',
        'korean-black': '900',
      }
    },
  },
  plugins: [],
}
