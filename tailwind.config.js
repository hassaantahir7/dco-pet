module.exports = {
  content: ["./src/**/*.html", "./src/**/*.jsx", "./src/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "custom-green": "#56A700",
        "custom-blue": "#223169",
        "custom-dark-blue":"#1D62B2",
        "blue-button": "#197BBD",
        "footer-primary": "#1A1F2B",
        "custom-red": "#C61132",
      },
      spacing: {
        30: "7.5rem",
      },
      fontSize:{
        'xs':'12px'
      }
    },
  },
  variants: {
    extend: {
      width: ["responsive"], // Add this line
    },
  },
  plugins: [],
};
