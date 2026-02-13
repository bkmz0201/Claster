'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var plugin = require('./plugin-107cf876.cjs.prod.js');
require('@vanilla-extract/integration');

class VanillaExtractPlugin extends plugin.AbstractVanillaExtractPlugin {
  apply(compiler) {
    this.inject(compiler, 'virtualFileLoader');
  }
}

exports.VanillaExtractPlugin = VanillaExtractPlugin;
