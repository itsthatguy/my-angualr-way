var webpack = require("webpack");

module.exports = {
  target: 'node-webkit',
  entry: './src/index.js',
  output: {
    filename: "[name].js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  }
}
