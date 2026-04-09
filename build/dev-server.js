require("./check-versions")();

var config = require("../config");
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
}

var opn = require("opn");
var path = require("path");
var express = require("express");
var webpack = require("webpack");
var proxyMiddleware = require("http-proxy-middleware");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpackConfig =
  process.env.NODE_ENV === "testing"
    ? require("./webpack.prod.conf")
    : require("./webpack.dev.conf");

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port;
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser;
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable;

var app = express();
var compiler = webpack(webpackConfig);

var webpackDevMiddleware = require("webpack-dev-middleware");
var devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
});

var hotMiddleware = require("webpack-hot-middleware")(compiler, {
  log: () => {},
});
// force page reload when html-webpack-plugin template changes (webpack 5 + html-webpack-plugin 5 hooks)
compiler.hooks.compilation.tap(
  "html-webpack-plugin-after-emit",
  function (compilation) {
    HtmlWebpackPlugin.getHooks(compilation).afterEmit.tapAsync(
      "hot-html-reload",
      function (data, cb) {
        hotMiddleware.publish({ action: "reload" });
        cb(null, data);
      },
    );
  },
);

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context];
  if (typeof options === "string") {
    options = { target: options };
  }
  app.use(proxyMiddleware(options.filter || context, options));
});

// handle fallback for HTML5 history API
app.use(require("connect-history-api-fallback")());

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// serve pure static assets
var staticPath = path.posix.join(
  config.dev.assetsPublicPath,
  config.dev.assetsSubDirectory,
);
app.use(staticPath, express.static("./static"));

var uri = "http://localhost:" + port;

var _resolve;
var readyPromise = new Promise((resolve) => {
  _resolve = resolve;
});

var isFirstCompile = true;
compiler.hooks.done.tap("dev-server-open", function (stats) {
  if (!isFirstCompile) return;
  isFirstCompile = false;
  console.log("> Listening at " + uri + "\n");
  // when env is testing, don't need open it; skip browser if compile failed
  if (
    autoOpenBrowser &&
    process.env.NODE_ENV !== "testing" &&
    !stats.hasErrors()
  ) {
    opn(uri).catch(function () {});
  }
  _resolve();
});

console.log("> Starting dev server...");
var server = app.listen(port);

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close();
  },
};
