const devConfig = {
  plugins: {
    // paths here are from the project root somehow, not the renderer root
    tailwindcss: { config: "./renderer/tailwind.config.cjs" },
    autoprefixer: {},
  },
};

const prodConfig = {
  plugins: {
    // paths here are from the project root somehow, not the renderer root
    tailwindcss: {},
    autoprefixer: {},
  },
};

module.exports =
  process.env.NODE_ENV === "development" ? devConfig : prodConfig;
