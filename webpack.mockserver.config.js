var path = require('path');

var config = {
  entry: path.resolve(__dirname) + '/mockpi.js',
  output: {
    path: path.resolve(__dirname, '.'),
    filename: 'mockpi-bundle.js'
  },
  module: {
    loaders: [
      {test: 'mockpi.js', include: '.', loader: 'babel-loader', query: ['es2015']}
    ]
  }
};

module.exports = config;