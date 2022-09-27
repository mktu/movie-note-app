module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          main : '#000000',
          disabled : '#EDEDEC',
          border : '#CCCCCC',
        },
        onprimary: {
          main : '#FFFFFF'
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
        destructive : {
          main : '#CE3E34'
        },
        text : {
          main : '#37352F',
          dark : '#111111',
          label : '#7A828B',
          disabled : '#7A828B'
        },
        border : {
          main : '#E4E7EB',
          dark : '#CCCCCC'
        },
        surface : {
          main : '#FFFFFF',
          hover : 'rgba(0,0,0,0.05)',
          selected : 'rgba(0,0,0,0.05)',
        },
        image : {
          placeholder : '#F7F7F7'
        },
        tag : {
          main : '#e5e7eb',
          active : '#d1d5db'
        },
        sidebar : {
          main : '#F7F7F7',
          focus : '#e5e5e5'
        },
        focus : '#90AFFF',
        bg : {
          main : '#FFFFFF',
        }
      }
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
