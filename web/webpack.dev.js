const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    host: "0.0.0.0",
    contentBase: "src",
    historyApiFallback: true,
    port: 3000,
    open: false,
    disableHostCheck: true,
  },
});
