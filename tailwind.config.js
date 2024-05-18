import { theme } from 'flowbite-react';
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

  daisyui: {
    darkMode: ['selector', '[data-theme="dark"]'],
  }
}
