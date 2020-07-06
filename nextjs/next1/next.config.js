const deps = require("./package.json").dependencies;
const { ModuleFederationPlugin } = require("webpack").container;
module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!isServer) {
      config.output.library = "next1";
      config.output.publicPath = "http://localhost:3000/_next/";
    } else {
    }
    config.plugins.push(
      // new webpack.ProvidePlugin({
      //   'global.React': 'react'
      // }),
      new ModuleFederationPlugin({
        name: "next1",
        library: { type: config.output.libraryTarget, name: "next1" },
        filename: "static/runtime/remoteEntry.js",
        exposes: {
          "./nav": "./components/nav",
          "./exposedTitle": "./components/exposedTitle",
          "./react": "react",
        },
        shared: {
          // react: {
          //   import: 'react',
          //   shareKey: "react",
          //   shareScope: "default",
          //   singleton: true,
          //   eager: true,
          //   // strictVersion: true, // don't use shared version when version isn't valid. Singleton or modules without fallback will throw, otherwise fallback is used
          //   version: require("react").version,
          //   requiredVersion: require("./package.json").dependencies["react"],
          // },
        },
      })
    );

    return config;
  },
  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
};
