/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainRed: "#EA5555",
        modalBackgroundLayer: 'rgba(0, 0, 16, 0.5)',
      },
    },
    screens: {
      's-375': '375px',
      's-400': '400px',
      's-480': '480px',
      's-767': '767px',
      's-991': '991px',
      's-1024': '1024px',
      's-1920': '1920px',
    },
  },
  plugins: [],
}

