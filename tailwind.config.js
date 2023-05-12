module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    fontFamily: {
      sans: ['open-sans', 'sans-serif'],
    },
    fontSize: {
      title: `3rem;`,
      body: `1rem;`
    },
    extend: {
      colors: {
        'title-blue': '#56A0BB',
        'body-gray': '#6F7782',
        'background-gray':'#E5E5E5',
      },
    },
  },
  plugins: [],
};
