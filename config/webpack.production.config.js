var path = require('path');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, '../src'),

  entry: './index.ts',
  output: {
    filename: 'bundle.min.js',
    path: path.resolve(__dirname, '../build'),
    library: 'bem'
  },

  resolve: {
    extensions: ['.ts'],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },

  plugins: [
    new UglifyJSPlugin()
  ]
};