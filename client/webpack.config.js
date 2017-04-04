/* eslint-env node */
var webpack = require('webpack');
var path = require('path');
var Dotenv = require('dotenv-webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot-loader!babel-loader'
    }, {
      test: /\.scss$/,
      loader: 'style-loader!css-loader!sass-loader'
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv()
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        bypass: function(req, res) {
          if(req.path == 'bundle.js'){
            return '/bundle.js';
          }
        }
      }
    }
  }
};