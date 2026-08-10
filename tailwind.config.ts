import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgDeep: "#06130E",
        bgScene: "#0A1C15",
        bgCard: "#0F281E",
        creamSilk: "#FDFBF7",
        goldAccent: "#D4AF37",
        goldBright: "#F5C542",
        appleRed: "#D62828",
        bananaYellow: "#F4C430",
        kiwiGreen: "#6BA539",
        guavaGreen: "#7CB342",
        pineappleYellow: "#F9A825",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Outfit", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
