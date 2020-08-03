const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const themeVariables = require("./template/theme");

module.exports = {
  entry: {
    index: "./src/index.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          minSize: 50000,
          name: "vendors",
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          {
            loader: "less-loader",
            options: {
              modifyVars: themeVariables,
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: "url-loader?limit=100000",
      },
    ],
  },
  devServer: {
    contentBase: "src",
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, "src/components/"),
      application: path.resolve(__dirname, "src/application/"),
      pages: path.resolve(__dirname, "src/application/pages"),
      config: path.resolve(__dirname, "src/config/"),
      assets: path.resolve(__dirname, "src/assets/"),
      services: path.resolve(__dirname, "src/services/"),
      contexts: path.resolve(__dirname, "src/contexts/"),
      util: path.resolve(__dirname, "src/util/"),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      title: "Obah",
      template: "./template/index.html",
      filename: "./index.html",
      meta: {
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
        "theme-color": "#4285f4",
      },
    }),
  ],
};
