const defaultTheme = require('tailwindcss/defaultTheme');

const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
    },
    colors: {
      white: colors.white,
      gray: colors.trueGray,
      red: colors.red,
      blue: colors.lightBlue,
      yellow: colors.amber,
      indigo: colors.indigo,
      green: colors.green,
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
