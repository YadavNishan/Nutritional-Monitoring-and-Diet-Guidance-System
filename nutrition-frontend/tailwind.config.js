/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"


export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        "nunito-sans": ["Nunito Sans", "sans-serif"],
        "dm-sans": ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [{
      customLight: {
        background: "#ffffff",
        onBackground: "#0d1220",
        onBackgroundVariant: "#6e7179",
        primary: "#35cc8c",
        onPrimary: "#ffffff",
        surfacePrimary: "#f7f7f7",
        onSurfacePrimary: "#0d1220",
        surfaceSecondary: "#dbfbed",
        onSurfaceSecondary: "#0d1220",
        surfaceVariant: "#cccccc",
        onSurfaceVariant: "#808080",
        outline: "#d9d9d9",
        outlineVariant: "#bfbfbf",
        bottomBarContainer: "#dbfbed",
        navigationItem: "#35cc8c",
        red: "#e56571",
        orange: "#ffa072",
        lightGreen: "#59ffc4",
        green: "#35cc8c",
      },
      customDark: {
        background: "#0d0d0d",
        onBackground: "#b3b3b3",
        onBackgroundVariant: "#656565",
        primary: "#49d199",
        onPrimary: "#242833",
        secondary: "#aa9bd2",
        surfacePrimary: "#242833",
        onSurfacePrimary: "#e6e6e6",
        surfaceVariant: "#3e414d",
        onSurfaceVariant: "#808080",
        outline: "#666666",
        outlineVariant: "#242833",
        bottomBarContainer: "#0d0d0d",
        navigationItem: "#90a6ba",
        red: "#b24f58",
        orange: "#cb7f5b",
        lightGreen: "#41ffbb",
        green: "#2dae77",
      }
    }],

  },
}

