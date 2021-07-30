const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { DefinePlugin } = require("webpack");
const ManifestPlugin = require("webpack-manifest-plugin");
const { GenerateSW } = require("workbox-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const merge = require("webpack-merge");

const client = require("./client.common");

const paths = require("../paths");

const workerName = "service-worker";
const workerManifestName = "precache-manifes";

const isWorkerRegExp = new RegExp(`${workerName}|${workerManifestName}`);

module.exports = merge(client, {
  devtool: "source-map",
  output: {
    filename: "static/js/[name].[contenthash].js",
    chunkFilename: "static/js/[name].[contenthash].js"
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          parse: {
            ecma: 8
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: { map: { inline: false, annotations: true } }
      })
    ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              sourceMap: true
            }
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 3,
              modules: {
                mode: "local",
                localIdentName: "[local][hash:base64:5]"
              }
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
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
          },
        ]
      }
    ]
  },
  plugins: [
    new ManifestPlugin({
      fileName: "asset-manifest.json",
      filter: ({ name }) => !isWorkerRegExp.test(name)
    }),
    new MiniCssExtractPlugin({ filename: "static/css/[contenthash].css" }),
  ]
});