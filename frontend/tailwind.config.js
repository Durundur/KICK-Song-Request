/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend:{
      colors:{
        backgroundColor: 'rgb(36, 39, 44)',
        secondaryBackgroundColor: 'rgb(63, 68, 72)',
        thirdBackgroundColor: 'rgb(36, 39, 44)',
        primaryColor: 'rgb(83, 252, 24)',
        primaryColorHover: 'rgb(61, 145, 32)',
        hoverColor: 'rgb(71, 79, 84)',
        secondaryTextColor: 'rgb(153, 153, 153)',
      }
    }
  },
  plugins: [],
}

