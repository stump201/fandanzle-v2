const WebpackBar = require("webpackbar");
const merge = require("webpack-merge");
const webpack = require("webpack");

const paths = require("../paths");
const client = require("./client.common");

module.exports = merge(client, {
  devtool: "cheap-module-eval-source-map",
  entry: {
    bundle: []
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[name].chunk.js"
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          {
            loader: "style-loader",
            options: {
              hmr: false
            }
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              modules: {
                mode: "local",
                localIdentName: "[local][hash:base64:5]"
              }
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: false,
              ident: "postcss",
              plugins: () => [
                require('postcss-custom-media'),
                require("postcss-flexbugs-fixes"),
                require("postcss-preset-env")({
                  autoprefixer: {
                    flexbox: "no-2009"
                  },
                  stage: 3
                })
              ]
            }
          },
          {
            loader: 'resolve-url-loader',
            options: {
              root: paths.src
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new WebpackBar({ profile: true, name: "client", color: "green" })
  ]
});