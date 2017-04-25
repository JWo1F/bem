var path = require('path');

module.exports = {
  context: path.resolve(__dirname, '../src'),

  entry: './index.ts',
  output: {
    filename: 'bundle.js',
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
  }
};