var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('../node_modules')
.filter(function(x) {
  return ['.bin', 'react', 'react-dom'].indexOf(x) === -1;
})
.forEach(function(mod) {
  nodeModules[mod] = 'commonjs ' + mod;
});
nodeModules.react = 'commonjs react';
nodeModules['react-dom'] = 'commonjs react-dom';
nodeModules['react-dom/server'] = 'commonjs react-dom/server';

module.exports = {
  entry: './src/index.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  node: {
    __dirname: false
  },
  externals: nodeModules,
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
};