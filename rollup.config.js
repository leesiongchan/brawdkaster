import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';

export default {
  input: 'src/index.ts',
  plugins: [
    commonjs(),
    typescript({
      typescript: require('typescript'),
    }),
  ],
  output: [{ file: pkg.main, format: 'cjs', exports: 'named' }, { file: pkg.module, format: 'es' }],
};
