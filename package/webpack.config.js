const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  entry: "./src/qwick-dom.js",
  output: {
    filename: "qwick-dom.min.js",
    path: __dirname + "/dist",
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [new CompressionPlugin()],
};
