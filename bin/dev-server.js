#!/usr/bin/env node
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
//const webpackDevMiddleware = require('webpack-dev-middleware');
//const webpackHotMiddleware = require('webpack-hot-middleware');
const path = require('path');
const config = require('../webpack/webpack.config.dev.js');

const port = 8001;
const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
  contentBase: 'http://localhost:' + port,
  publicPath: config.output.publicPath,
  quiet: true,
  noInfo: true,
  inline: true,
  lazy: false,
  headers: {'Access-Control-Allow-Origin': '*'},
  hot: true,
  stats: {
    colors: true,
    chunkModules: false
  }
});


server.listen(port, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }
  console.info('DevServer runnint at localhost: %d', port);
});