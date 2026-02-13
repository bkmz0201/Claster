import { A as AbstractVanillaExtractPlugin } from './plugin-81d80de0.esm.js';
import '@vanilla-extract/integration';

class VanillaExtractPlugin extends AbstractVanillaExtractPlugin {
  apply(compiler) {
    this.inject(compiler, 'virtualFileLoader');
  }
}

export { VanillaExtractPlugin };
