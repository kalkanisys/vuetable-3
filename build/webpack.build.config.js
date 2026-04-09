var webpack = require("webpack");
var path = require("path");
var version = require("./../package.json").version;
var banner =
  "/**\n" +
  " * vuetable-2 v" +
  version +
  "\n" +
  " * https://github.com/ratiw/vuetable-2\n" +
  " * Released under the MIT License.\n" +
  " */\n";
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

var utils = require("./utils");
var { merge } = require("webpack-merge");
var baseWebpackConfig = require("./webpack.base.conf");

var cssFileName = "vuetable-2.css";
var jsFileName = "vuetable-2.js";

if (process.env.MINIFY && process.env.MINIFY === "false") {
  jsFileName = "vuetable-2-full.js";
}

var webpackConfig = merge(baseWebpackConfig, {
  mode: process.env.MINIFY === "true" ? "production" : "none",
  module: {
    rules: utils.styleLoaders({ sourceMap: true, extract: true }),
  },
  entry: path.join(__dirname, "..", "src/index.js"),
  output: {
    path: path.join(__dirname, "..", "dist"),
    filename: jsFileName,
    library: "Vuetable",
    libraryTarget: "umd",
  },
  optimization: {
    minimize: process.env.MINIFY === "true",
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"',
      },
      VERSION: JSON.stringify(require("../package.json").version),
      __VUE_OPTIONS_API__: "true",
      __VUE_PROD_DEVTOOLS__: "false",
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "false",
    }),
    new webpack.BannerPlugin({
      banner: banner,
      raw: true,
    }),
    new MiniCssExtractPlugin({ filename: cssFileName }),
  ],
  resolve: {
    aliasFields: ["browser"],
  },
});

module.exports = webpackConfig;
