/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins: "Poppins",
      },

      colors: {
// Earth / Natural palette
        clay: '#CB997E',        // Warm Clay
        sand: '#DDBEA9',        // Sand Beige
        ivory: '#FFE8D6',       // Warm Ivory
        stone: '#B7B7A4',       // Stone Gray
        sage: '#A5A58D',        // Sage Stone
        olive: '#6B705C',       // Earth Olive
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },

      animation: {
        fadeIn: 'fadeIn 2s ease-out',
        slideInLeft: 'slideInLeft 1.5s ease-out',
      },
    },
  },
  plugins: [],
}
