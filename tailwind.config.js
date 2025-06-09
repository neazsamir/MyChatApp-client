/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    	colors: {
    		primary: "#131521",
    	},
    	animation: {
    		spin: "spin 3s linear infinite"
    	}
    },
  },
  plugins: [],
}