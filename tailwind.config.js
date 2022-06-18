module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      /*colors: {
        primary: '#FD5D5D',
        secondary: '#FF8080',
        secondary_fade: '#FF808070',
        light: '#FFF7BC',
        strong: '#C0EDA6',
        strong_fade: '#C0EDA670'
      }*/
      /*colors: {
        primary: '#05668D',
        secondary: '#028090',
        secondary_fade: '#00A89670',
        light: '#F0F3BD',
        strong: '#02C39A',
        strong_fade: '#00A89670'
      }*/
      colors: {
        primary: '#52796F',
        secondary: '#84A98C',
        secondary_fade: '#84A98C70',
        light: '#CAD2C5',
        light_fade: '#CAD2C520',
        strong: '#2F3E46',
        strong_fade: '#2F3E4670'
      }
      /*colors: {
        primary: '#774936',
        secondary: '#8A5A44',
        secondary_fade: '#8A5A4470',
        light: '#E6B8A2',
        strong: '#77493685',
        strong_fade: '#77493660'
      }*/
    },
  },
  plugins: [],
}
