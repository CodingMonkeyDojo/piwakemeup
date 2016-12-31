var webpack = require('webpack');
var path = require('path');
var nodeExternals = require('webpack-node-externals');

var BUILD_DIR = path.resolve(__dirname, 'src/server/public');
var APP_DIR = path.resolve(__dirname, 'src/server/app');

var config = {
  entry: [ APP_DIR + '/index.js' ],
  target: 'node',
  node: {
    __dirname: true
  },
  externals: [nodeExternals()],
  output: {
    path: BUILD_DIR,
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: APP_DIR,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.json$/,
        loader: 'json',
      }
    ]
  }
};

module.exports = config;
