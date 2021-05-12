import defaultParserInterface from './utils/defaultESTreeParserInterface';
import pkg from '@swc/wasm-web/package.json';

const ID = '@swc/wasm-web';
export const defaultOptions = {
  syntax: 'ecmascript',
  tsx: false,
  jsx: false,
  dynamicImport: false,
};
export const parserSettingsConfiguration = {
  fields: [
    ['syntax', ['ecmascript', 'typescript']],
    'tsx',
    'jsx',
    'dynamicImport',
  ],
};

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage || 'https://swc.rs/',
  locationProps: new Set(['span']),

  opensByDefault(node, key) {
    return (
      (Boolean(node) && node.type === 'Module') ||
      key === 'body' ||
      key === 'elements' || // array literals
      key === 'declarations' || // variable declaration
      key === 'expression' // expression statements
    );
  },

  loadParser(callback) {
    require(['@swc/wasm-web'], callback);
  },

  parse(swc, code, options) {
    return swc.parseSync(code, options);
  },

  getDefaultOptions() {
    return defaultOptions;
  },

  _getSettingsConfiguration() {
    return parserSettingsConfiguration;
  },

  nodeToRange(node) {
    // TODO
    return node.range;
  },
};
