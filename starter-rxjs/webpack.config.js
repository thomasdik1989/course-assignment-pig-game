const { resolve } = require('path');

module.exports = {
  entry: {
    game: './src/main.js',
  },
  output: {
    path: resolve(`${__dirname}/dist`),
    filename: '[name].bundle.js',
    publicPath: "dist/"
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }
    ]
  }
};
