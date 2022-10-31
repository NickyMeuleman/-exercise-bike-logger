const devConfig = {
  content: [
    // paths here are from the project root somehow, not the renderer root
    "./renderer/index.html",
    "./renderer/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

const prodConfig = {
  content: [
    // paths here are from the project root somehow, not the renderer root
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

module.exports =
  process.env.NODE_ENV === "development" ? devConfig : prodConfig;
