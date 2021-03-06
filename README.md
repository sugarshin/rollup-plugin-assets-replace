# rollup-plugin-assets-replace

[![CircleCI](https://circleci.com/gh/sugarshin/rollup-plugin-assets-replace/tree/main.svg?style=svg)](https://circleci.com/gh/sugarshin/rollup-plugin-assets-replace/tree/main)
[![npm version](https://img.shields.io/npm/v/rollup-plugin-assets-replace.svg)](https://www.npmjs.org/package/rollup-plugin-assets-replace)

> Rollup plugin which replaces assets

## Description

A [Rollup](https://rollupjs.org/guide/en/) plugin that replaces assets.

## Install

```sh
npm i -D rollup-plugin-assets-replace
```

### Peer Dependencies

rollup-plugin-assets-replace depends on rollup, you need to manually install as development dependencies as well.

## Usage

```js
// rollup.config.js
import { assetsReplace } from 'rollup-plugin-assets-replace';

export default {
  // ...
  plugins: [
    assetsReplace({
      include: [],
      exclude: [],
      map: (assetName, asset) => asset,
    }),
  ],
}
```

### Example

For example, replace module name in TypeScript declaration files.

```js
// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import { assetsReplace } from 'rollup-plugin-assets-replace';

export default {
  input: 'src/index.ts',
  output: {
    file: 'lib/index.js',
    format: 'cjs',
  },
  plugins: [
    typescript(),
    assetsReplace({
      include: [/\.d\.ts$/],
      map(name, asset) {
        asset.source = asset.source.replace(
          /('|"|`)@rollup\/([^/'"`])/g,
          (_, p1, p2) => `${p1}rollup-${p2}`,
        );
        return asset;
      },
    }),
  ],
};
```

### Type Declarations

```ts
import type { OutputAsset, Plugin } from 'rollup';
import type { FilterPattern } from '@rollup/pluginutils';
export declare type Options = {
    include?: FilterPattern;
    exclude?: FilterPattern;
    map(fileName: string, asset: OutputAsset): OutputAsset;
};
export declare function assetsReplace(options: Options): Plugin;
```

## License

[MIT](https://sugarshin.mit-license.org/)

© sugarshin
