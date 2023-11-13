/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/(admin)/admin/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'giphy-background': "url('https://media.giphy.com/media/FlodpfQUBSp20/giphy.gif')",
      },
      backgroundColor: {
        'bg-color-1': 'rgb(143, 64, 164)',
        'bg-color-2': 'rgb(98, 0, 123)',
        'bg-color-3': 'rgb(55, 32, 86)',
        'bg-color-4': 'rgb(255, 0, 155)',
        'bg-color-5': 'rgb(255, 248, 187)',
        'bg-color-6': 'rgb(89, 229, 173)',
      },
      textColor: {
        'text-color-1': 'rgb(143, 64, 164)',
        'text-color-2': 'rgb(98, 0, 123)',
        'text-color-3': 'rgb(55, 32, 86)',
        'text-color-4': 'rgb(255, 0, 155)',
        'text-color-5': 'rgb(255, 248, 187)',
        'text-color-6': 'rgb(89, 229, 173)',
      },
      fontFamily: {
        lobster: ['Lobster', 'cursive'],
        tangerine: ['Tangerine', 'cursive'],
        sacramento: ['Sacramento', 'cursive'],
      },
      

    },
  },
  plugins: [],
}

