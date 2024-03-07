/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'register-img': "url('/regira-img.svg')"
      }
    },
  },
  plugins: [],
};
