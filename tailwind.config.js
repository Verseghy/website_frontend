const colors = require('tailwindcss/colors')

module.exports = (isProd) => ({
  prefix: '',
  purge: {
    enabled: isProd,
    content: ['./apps/**/*.html', './apps/**/*.ts', './libs/**/*.html', './libs/**/*.ts'],
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: 'Inter',
        mono: 'JetBrains Mono',
      },
      colors: {
        primary: colors.green,
        gray: colors.trueGray,
        transparent: 'transparent',
      },
    },
  },
  variants: {
    extend: {
      transitionProperty: ['motion-safe'],
      borderWidth: ['focus'],
      borderColor: ['disabled'],
      backgroundColor: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [],
})
