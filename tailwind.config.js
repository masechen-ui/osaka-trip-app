export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F5F0E8", card: "#FFFDF7", border: "#E5DECE", stamp: "#C4735A",
        accent: "#7B9E6B", "accent-2": "#D4956A", "accent-3": "#6B8FA8",
        muted: "#9B8E85", text: "#3D3530",
        "tag-sight": "#E8F4EC", "tag-food": "#FEF3E8",
        "tag-transport": "#E8F0F8", "tag-hotel": "#F3E8F8",
      },
      fontFamily: { sans: ["Noto Sans TC", "sans-serif"], journal: ["Caveat", "cursive"] },
      boxShadow: {
        card: "3px 3px 0px #D8D0C0",
        "card-sm": "2px 2px 0px #D8D0C0",
        "btn-green": "0 3px 0 #4A7A3A",
      },
    },
  },
  plugins: [],
}
