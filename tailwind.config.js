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
      transparent: 'transparent',
      white: colors.white,
      black: colors.black,
      gray: colors.trueGray,
      red: colors.red,
      blue: colors.lightBlue,
      yellow: colors.amber,
      indigo: colors.indigo,
      green: colors.green,
    }
  },
  variants: {
    extend: {
      textColor: ['visited'],
      borderColor: ['focus-visible', 'first'],
      backgroundColor: ['responsive', 'even', 'odd', 'hover', 'focus', 'active'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
