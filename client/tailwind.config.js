/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      consolas: ['Consolas', 'Monaco', 'Courier New', 'monospace'],
      sticknobills: ['"Stick No Bills"', 'sans-serif'],
      raleway: ['Raleway', 'sans-serif'],
    }, 
    extend: {},
  },
  plugins: [],
}

