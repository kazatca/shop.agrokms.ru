import {readdirSync} from 'fs';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';

const externals = readdirSync('../node_modules');

export default {
  entry: 'src/index.js',
  sourceMap: true,
  format: 'cjs',
  plugins: [
    babel({
      exclude: ['node_modules/**', '../client/src/scss/**'],
      babelrc: false,
      presets: [
        ["es2015", {modules: false}],
        "react",
        "stage-2"
      ],
      plugins: [
        'external-helpers'
      ]
    }),
    json()
  ],
  external: [...externals, 'fs', 'react-dom/server'],
  dest: 'dist/bundle.js'
};