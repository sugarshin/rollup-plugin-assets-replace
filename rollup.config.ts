import typescript from '@rollup/plugin-typescript';
const plugins = [typescript()];
export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'lib/index.cjs.js',
      format: 'cjs',
    },
    plugins,
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'lib/index.es.js',
      format: 'es',
    },
    plugins,
  },
];
