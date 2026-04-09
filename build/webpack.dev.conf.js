var utils = require("./utils");
var webpack = require("webpack");
var config = require("../config");
var { merge } = require("webpack-merge");
var baseWebpackConfig = require("./webpack.base.conf");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var FriendlyErrorsPlugin = require("@soda/friendly-errors-webpack-plugin");

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ["./build/dev-client"].concat(
    baseWebpackConfig.entry[name],
  );
});

module.exports = merge(baseWebpackConfig, {
  mode: "development",
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap }),
  },
  // cheap-module-eval-source-map is faster for development
  devtool: "eval-cheap-module-source-map",
  plugins: [
    new webpack.DefinePlugin({
      "process.env": config.dev.env,
      __VUE_OPTIONS_API__: "true",
      __VUE_PROD_DEVTOOLS__: "false",
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "false",
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: true,
    }),
    new FriendlyErrorsPlugin(),
  ],
});
