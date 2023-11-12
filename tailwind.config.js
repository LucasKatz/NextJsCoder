/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
  backgroundImage: ({
        'giphy-background': "url('https://media.giphy.com/media/FlodpfQUBSp20/giphy.gif')",
      }),
    },
    
  },
  plugins: [],
}
