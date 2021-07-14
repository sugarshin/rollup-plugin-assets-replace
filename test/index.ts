import fs from 'fs';
import path from 'path';
import test from 'ava';
import { SetRequired } from 'type-fest';
import type { NormalizedOutputOptions, OutputBundle, OutputAsset, PluginContext } from 'rollup';

import { assetsReplace, Options } from '../src';

type AssetsReplacePlugin = SetRequired<ReturnType<typeof assetsReplace>, 'generateBundle'>;

const pluginContext = {} as PluginContext;
const normalizedOutputOptions = {} as NormalizedOutputOptions;

const fixture: OutputBundle = {
  'foo.txt': {
    fileName: 'foo.txt',
    source: fs.readFileSync(path.resolve(__dirname, './fixtures/foo.txt'), 'utf8'),
    type: 'asset',
    isAsset: true,
    name: undefined,
  },
  'bar.d.ts': {
    fileName: 'bar.d.ts',
    source: fs.readFileSync(path.resolve(__dirname, './fixtures/bar.d.ts'), 'utf8'),
    type: 'asset',
    isAsset: true,
    name: undefined,
  },
  'other.img': {
    code: 'code',
    type: 'chunk',
    exports: [],
    facadeModuleId: null,
    isDynamicEntry: false,
    isEntry: false,
    isImplicitEntry: false,
    modules: {},
    name: 'other.img',
    dynamicImports: [],
    fileName: 'other.img',
    implicitlyLoadedBefore: [],
    importedBindings: {},
    imports:[],
    referencedFiles: [],
  },
};

test('should be replaced .txt', (t) => {
  const options: Options = {
    include: [/\.txt$/],
    map(_: string, asset: OutputAsset): OutputAsset {
      if (asset.source instanceof Uint8Array) {
        return asset;
      }
      asset.source = asset.source.replace(/dolor/g, 'replaced');
      return asset;
    },
  };
  const plugin = assetsReplace(options) as AssetsReplacePlugin;
  plugin.generateBundle.call(pluginContext, normalizedOutputOptions, fixture, true);
  t.snapshot(fixture)
});

test('should be replaced .d.ts', (t) => {
  const options: Options = {
    include: [/\.d\.ts$/],
    map(_: string, asset: OutputAsset): OutputAsset {
      if (asset.source instanceof Uint8Array) {
        return asset;
      }
      asset.source = asset.source.replace(
        /('|"|`)@sugarshin\/([^/'"`])/g,
        (_, p1, p2) => `${p1}@ins0/sugarshin_${p2}`,
      );
      return asset;
    },
  };
  const plugin = assetsReplace(options) as AssetsReplacePlugin;
  plugin.generateBundle.call(pluginContext, normalizedOutputOptions, fixture, true);
  t.snapshot(fixture)
});
