module.exports = {
  content: ["./src/**/*.html", "./src/**/*.jsx", "./src/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "custom-green": "#73bf43",
        "custom-blue": "#223169",
        "custom-dark-blue":"#1a1f2b",
        "blue-button": "#197BBD",
        "footer-primary": "#1A1F2B",
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
