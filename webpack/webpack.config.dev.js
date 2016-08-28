const path = require('path');
const webpack = require('webpack');
const assetPath = path.join(__dirname, './static/dist');

var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack.isomorphic-tools.js'));
var devPort = 8001;

module.exports = {
  context: path.resolve(__dirname, '.'),
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:' + devPort,
    'webpack/hot/only-dev-server',
    path.join(__dirname, '../src/client')
  ],
  output: {
    path: assetPath,
    filename: 'bundle.js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: 'http://localhost:' + devPort +'/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true
    }),
    webpackIsomorphicToolsPlugin.development()
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
        loader: 'style!css?modules&localIdentName=[local]_[name]_[hash:base64:5]!autoprefixer?{browsers:["> 5%"]}',
        exclude: /node_modules/
      }
    ]
  }
};