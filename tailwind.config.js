module.exports = {
  content: ['./src/**/*.html', './src/**/*.js'],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant('my-variant', '&:my-custom'); // або що потрібно
    })
  ],
};