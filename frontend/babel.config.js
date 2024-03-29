const path = require('path');

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: [path.resolve(__dirname)],
        alias: {
          '@stores': './src/stores',
          src: './src/',
        },
      },
    ],
  ],
};
