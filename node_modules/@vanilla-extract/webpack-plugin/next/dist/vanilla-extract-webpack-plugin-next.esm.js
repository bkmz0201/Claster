import path from 'path';
import { A as AbstractVanillaExtractPlugin } from '../../dist/plugin-81d80de0.esm.js';
import '@vanilla-extract/integration';

const virtualNextFileLoader = require.resolve(path.join(path.dirname(require.resolve('../../package.json')), 'virtualNextFileLoader'));
class VanillaExtractPlugin extends AbstractVanillaExtractPlugin {
  static loader = virtualNextFileLoader;
  apply(compiler) {
    this.inject(compiler, 'virtualNextFileLoader');
  }
}

export { VanillaExtractPlugin };
