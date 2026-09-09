/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#F36F21', dark: '#C94E0D' },
        surface: '#FFFFFF',
        background: '#F7F5F2',
        graphite: '#252525',
      },
    },
  },
  plugins: [],
};
