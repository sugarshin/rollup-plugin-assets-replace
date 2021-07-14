import { createFilter } from '@rollup/pluginutils';

import type { OutputAsset, OutputChunk, Plugin } from 'rollup';
import type { FilterPattern } from '@rollup/pluginutils';

export type Options = {
  include?: FilterPattern;
  exclude?: FilterPattern;
  map(fileName: string, asset: OutputAsset): OutputAsset;
}

export function assetsReplace(options: Options): Plugin {
  const filter = createFilter(options.include, options.exclude);
  const { map = identify } = options;
  return {
    name: 'assets-replace',
    generateBundle(_, bundle) {
      const entries = Object.entries(bundle).filter(onlyAsset)
      for (const entry of entries) {
        const assetName = entry[0];
        if (!filter(assetName)) {
          continue
        }
        const result = map(...entry);
        if (assetName !== result.fileName) {
          delete bundle[assetName];
        }
        bundle[result.fileName] = result;
      }
    },
  };
}

function identify<T>(_: string, asset: T): T {
  return asset;
}

function onlyAsset(entry: [string, OutputAsset | OutputChunk]): entry is [string, OutputAsset] {
  return isAsset(entry[1]);
}

function isAsset(output: OutputAsset | OutputChunk): boolean {
  return output.type === 'asset';
}
