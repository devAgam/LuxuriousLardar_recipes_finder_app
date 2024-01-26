const path = require("path");
const HtmlBundlerPlugin = require("html-bundler-webpack-plugin");

module.exports = {
  output: {
    path: path.join(__dirname, "dist/"),
  },

  plugins: [
    new HtmlBundlerPlugin({
      entry: {
        // define HTML files here

        // output dist/index.html
        index: "./index.html",
      },
      js: {
        // output filename of extracted JS
        filename: "assets/js/[name].[contenthash:8].js",
      },
      css: {
        // output filename of extracted CSS
        filename: "assets/css/[name].[contenthash:8].css",
      },
    }),
  ],

  module: {
    rules: [
      // HTML templates
      {
        test: /\.html$/,
        loader: HtmlBundlerPlugin.loader, // HTML template loader
      },
      // styles
      {
        test: /\.(css|sass|scss)$/,
        use: ["css-loader", "sass-loader"],
      },
      // images
      {
        test: /\.(png|jpe?g|ico|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/img/[name].[hash:8][ext]",
        },
      },
    ],
  },
};
