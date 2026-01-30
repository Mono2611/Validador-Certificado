/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./frontend/public/**/*.html",
    "./frontend/src/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1986ac',    // Azul Escuro
        secondary: '#25a8ab',  // Azul Claro
      },
    },
  },
  plugins: [],
}
