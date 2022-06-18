module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          main : '#6123DC',
        },
        secondary: {
          main : '#90EE02'
        },
        error: {
          main : '#DB3F35'
        },
        success : {
          main : '#66BB69'
        },
        info : {
          main : '#2AB5F6'
        },
        text : {
          main : '#37352F',
          dark : '#111111',
          disabled : '#7A828B'
        },
        border : {
          main : '#E4E7EB',
          dark : '#CCCCCC'
        },
        surface : {
          main : '#F7F7F7'
        },
        bg : {
          main : '#FFFFFF'
        }
      }
    },
  },
  plugins: [],
}
