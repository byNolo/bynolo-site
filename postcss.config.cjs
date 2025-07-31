module.exports = {
  plugins: [
    require('@tailwindcss/postcss')({
      // Optional: enable experimental features if needed
      // future: { hoverOnlyWhenSupported: true },
    }),
    require('autoprefixer'),
  ],
}