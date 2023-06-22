/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'blue1': '#E3F2F1',
        'blue2': '#B4EAF6',
        'blue3': '#18A0FB',
        'blue4': '#1288D7',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

