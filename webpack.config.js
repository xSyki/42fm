const webpack = require("webpack");
const path = require("path");
var { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const config = (env) => {
  return {
    entry: {
      iframe: path.resolve(__dirname, "src/iframe.js"),
      content: path.resolve(__dirname, "src/pages/content/content.tsx"),
      inject: path.resolve(__dirname, "src/inject.ts"),
      background: path.resolve(__dirname, "src/pages/background/background.ts"),
    },
    output: {
      path: path.resolve(__dirname, "dist", env.DIST),
      filename: "[name].js",
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: "babel-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.ts(x)?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/inline",
        },
        {
          test: /\.html$/i,
          loader: "html-loader",
        },
        {
          test: /iframe\.js$/,
          loader: "val-loader",
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.ProgressPlugin({}),
      new webpack.DefinePlugin({
        "process.env.BROWSER": JSON.stringify(env.BROWSER),
      }),
    ],
    resolve: {
      plugins: [new TsconfigPathsPlugin()],
      extensions: [".tsx", ".ts", ".js"],
    },
  };
};

module.exports = config;
