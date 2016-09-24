#!/usr/bin/env node

var path = require('path');
var rootDir = path.resolve(__dirname, '..');
var fs = require('fs');

// Parse the .babelrc config file
var babelrc = fs.readFileSync(rootDir + '/.babelrc');
var config;

try {
  config = JSON.parse(babelrc);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}

// Using babel-register to do the runtime compile,
// to make Node.js support the ES6 module loading.
require('babel-register')(config);

// Define some isomorphic constants.
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';
global.__DEVTOOLS__ = __DEVELOPMENT__;

if (__DEVELOPMENT__) {
  // Watching the file modify in development,
  // restart the server after file changed.
  if (!require('piping')({
      hook: true,
      ignore: /(\/\.|~$|\.json|\.css$|^node_modules\/)/i
    })) {
    return;
  }
}

// The control interface of webpack-isomorphic-tools,
// running the project on server.
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack.isomorphic-tools'))
  .development(__DEVELOPMENT__)
  .server(__DEVELOPMENT__ ? __dirname : rootDir, function() {
    require('../src/server');
  });
