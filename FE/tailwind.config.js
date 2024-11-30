/** @type {import('tailwindcss').Config} */
module.exports = {


  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'main-gray': 'rgba(44, 56, 74, .95)',
        'white-gray': 'rgba(0, 0, 21, .2)',
        'primary' : '#1976d2',
        'error' : '#d32f2f',
      }
    },
  },
  plugins: [{

  }],
};
