const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: [
    "../app/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    'storybook-react-i18next',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  framework: "@storybook/react",
  webpackFinal(config) {
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve(__dirname, '../')
    ]

    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin()
    ]
    return config;
  },
}