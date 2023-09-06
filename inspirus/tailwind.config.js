/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./index.html",
  "./Pages/**/*.{js,ts,jsx,tsx,html}",
  "./src/pages/LoadingPage/App.jsx",
  "Pages/Event/Incarnate/index.html",
  "Pages/Team/index.html"
],
  theme: {
    fontFamily:{
      'minecraft':'Minecraft',
      'rubik':'Rubik',
      'NotoSans':'Rubik',
      'NotoSerif':'Rubik',
      'IBMPlexSerif':'IBMPlexSerif',
      'ElegantoSans':'ElegantoSans',
      'Poppins':'Poppins',
    },
    extend: {
      colors: {
        "primary": "var(--primary)",
        "primary-2": "var(--primary-2)",
        "textColor": "var(--textColor)",
        "textColorHover": "var(--textColorHover)",
        "c1": "var(--c1)",
        "c2": "var(--c2)",
        "c3": "var(--c3)",
        "c4": "var(--c4)",
        "c5": "var(--c5)",
        "c6": "var(--c6)"
      }
    },
  },
  plugins: [],
}



