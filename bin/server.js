#!/usr/bin/env node
var path = require('path');
var rootDir = path.resolve(__dirname, '..');
var fs = require('fs');

var babelrc = fs.readFileSync(rootDir + '/.babelrc');
var config;

try {
  config = JSON.parse(babelrc);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}

require('babel-register')(config);
/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';
global.__DEVTOOLS__ = __DEVELOPMENT__;

if (__DEVELOPMENT__) {
  if (!require('piping')({
      hook: true,
      ignore: /(\/\.|~$|\.json|\.css$|^node_modules\/)/i
    })) {
    return;
  }
}

var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack.isomorphic-tools'))
  .development(__DEVELOPMENT__)
  .server(__DEVELOPMENT__ ? __dirname : rootDir, function() {
    require('../src/server');
  });
