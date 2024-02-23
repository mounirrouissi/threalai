/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle, #3f5efb 0%, #fc466b 100%)',
      },
      colors: {
        primary: '#266591',
        secondary: '#4f88b4',
        third: '#83b0d5',
        teal: {
          400: '#4fd1c5',
          500: '#38b2ac'
        },
        cyan: {
          500: '#0bc5ea',
          600: '#00a3c4'
        }
      },

    },
  },
  plugins: [require('tailwindcss-animated')],
};
