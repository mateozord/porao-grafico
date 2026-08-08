/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        coal: '#080708',
        ash: '#171316',
        bone: '#efe7dc',
        paper: '#c7bdae',
        bruise: '#2d1238',
        ritual: '#7f1d56',
        ember: '#c03377',
      },
      fontFamily: {
        display: ['Impact', 'Haettenschweiler', 'Arial Narrow', 'sans-serif'],
        body: ['Inter', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        poster: '0 30px 80px rgba(0, 0, 0, 0.55)',
        bruise: '0 0 60px rgba(192, 51, 119, 0.2)',
      },
      backgroundImage: {
        slash:
          'linear-gradient(135deg, rgba(255,255,255,.09) 0 1px, transparent 1px 10px)',
      },
    },
  },
  plugins: [],
}
