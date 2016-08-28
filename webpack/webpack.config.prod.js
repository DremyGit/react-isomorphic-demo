var webpack = require('webpack');
var path = require('path');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack.isomorphic-tools.js'));

const rootPath = path.resolve(__dirname, '../');
const assetsPath = path.join(rootPath, 'dist');

module.exports = {
  context: rootPath,
  entry: {
    bundle: path.join(__dirname, '../src/client')
  },
  output: {
    path: assetsPath,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath:  '/static/'
  },
  plugins: [
    new CleanPlugin([assetsPath, path.join(__dirname, './webpack-assets.json')], { root:  rootPath}),
    new ExtractTextPlugin('[name]-[chunkhash].css', {allChunks: true}),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      },
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    webpackIsomorphicToolsPlugin
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'react-hot!babel',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style','css?modules&localIdentName=[hash:base64:5]!autoprefixer?{browsers:["> 5%"]}'),
        exclude: /node_modules/
      }
    ]
  }
};