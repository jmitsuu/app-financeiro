/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        bgSite:'#f4f5f7',
        colorSite:'#E28D17',
        colorDarkSite:'#393939'
      },
      keyframes:{
      
  
        
      }
      
    },
  },
  plugins: [],
}

