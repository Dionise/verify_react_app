const path = require('path');

module.exports = {
  root: true,
  extends: '@react-native-community',
  parserOptions: {
    requireConfigFile: false,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname)],
        alias: {
          '@stores': './src/stores',
          src: './src/',
        },
      },
    },
  },
};
