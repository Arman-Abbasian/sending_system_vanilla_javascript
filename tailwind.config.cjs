/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,mjs}",
    "./public/**/*.{html,mjs}"
  ],
  theme: {
    extend: {
      colors: {
        darkGreen: '#61892f',
        lightGreen: '#86c232',
        black:'#222629',
        darkGray:"#474b4f",
        lightGray:"#6b6e70",
        gold:"#faed26"
      }
    },
  },
  plugins: [],
}
