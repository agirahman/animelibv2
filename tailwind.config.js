/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Mengaktifkan dark mode dengan class 'dark'
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Semua file JS, JSX, TS, TSX di dalam folder src dan subfoldernya
  ],
  theme: {
    extend: {
      shadow: {
        'custom-shadow': '4px 4px 10px rgba(0, 0, 0, 1)', // Contoh custom shadow
      },
    },
  },
  plugins: [],
};
