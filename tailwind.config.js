/** @type {import('tailwindcss').Config} */
export default  {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./index.html",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
