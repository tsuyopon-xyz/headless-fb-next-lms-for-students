module.exports = {
  mode: 'jit',
  purge: [],
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#333',
            'max-width': '100%',
            a: {
              color: '#3182ce',
              '&:hover': {
                color: '#2c5282',
              },
            },
            h2: {
              'margin-top': 0,
            },
            ul: {
              margin: 0,
            },
            p: {
              margin: 0,
            },
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
