const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
    configure: webpackConfig => {
      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
        ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin'
      );

      webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);
      return webpackConfig;
    }
  },
  style: {
    postcss: {
      plugins: [
        require("tailwindcss"),
        require("autoprefixer"),
      ],
    },
  },
};
