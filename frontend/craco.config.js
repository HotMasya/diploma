const path = require('path');

module.exports = {
  style: {
    sass: {
      loaderOptions: {
        sassOptions: {
          indentWidth: 2,
          includePaths: [path.resolve(__dirname, './src')],
        },
      },
    },
  },
  webpack: {
    alias: {
      Api: path.resolve(__dirname, './src/Api/'),
      Assets: path.resolve(__dirname, './src/Assets/'),
      Components: path.resolve(__dirname, './src/Components/'),
      Constants: path.resolve(__dirname, './src/Constants/'),
      Engine: path.resolve(__dirname, './src/Engine/'),
      Helpers: path.resolve(__dirname, './src/Helpers/'),
      Hooks: path.resolve(__dirname, './src/Hooks/'),
      Models: path.resolve(__dirname, './src/Models/'),
      Screens: path.resolve(__dirname, './src/Screens/'),
    },
  },
};
