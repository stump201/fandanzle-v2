const merge = require("webpack-merge");

const paths = require("../paths");

const { common } = require('../common');

module.exports = merge(common, {
  target: "web",
  entry: {
    bundle: ["./src/client/index"]
  },
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty",
    dgram: "empty",
    child_process: "empty"
  }
});