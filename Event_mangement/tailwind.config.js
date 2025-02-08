import daisyui from "daisyui";


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],

  daisyui: {
  themes: ["synthwave", "cyberpunk", "luxury", "dracula"], // New predefined themes
},

}

