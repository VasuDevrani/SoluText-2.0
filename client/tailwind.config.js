module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    nav: "1030px",
    fontFamily: {
      Inter: ["Inter, sans-serif"],
    },
    container: {
      padding: "0.7rem",
      center: true
    },
    extend: {
      colors: {
        "site-black": "#4B4C50",
        "site-grey": "#BEC2CE",
        "site-dark-blue": "#0D30F5",
        "site-yellowish": "#A1A569",
        "site-blue": "#2E55ED"
      },
    },
  },
  plugins: [],
};