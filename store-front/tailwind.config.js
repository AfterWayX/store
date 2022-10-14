/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [
    './pages/**/*.tsx',
    './pages/**/*.js',
    './pages/**/*.ts',
    './components/**/*.tsx',
    './components/**/*.js',
    './components/**/*.ts',
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {},
  },
  plugins: [],
}
