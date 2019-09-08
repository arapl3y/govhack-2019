/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    fontFamily: {
      display: ['Poppins', 'sans-serif'],
      body: ['Poppins', 'sans-serif']
    },
    extend: {
      colors: {
        primary: '#08A563', // green
        secondary: '#E7B158' // orange
      }
    }
  },
  variants: {},
  plugins: []
}
