const { screens } = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    screens,
    colors: {
      primary: "#D8A868",
    },
    fontSize: {
      h1: ["36px"],
      h2: ["28px"],
      "body-m": ["22px"],
      "body-s": ["20px"],
      "detail-s": ["18px"],
      "detail-xs": ["14px"],
    },
    fontFamily: {
      regular: ["Open Sans"],
      medium: ["Open Sans"],
      bold: ["Open Sans"],
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
  plugins: [],
};
