//const path = require('path')
//const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
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
    //'@storybook/addon-webpack5-compiler-babel',
    '@chromatic-com/storybook'
  ],
  // framework: {
  //   name: '@storybook/react-webpack5',
  //   options: {}
  // },

  // webpackFinal(config) {
  //   config.resolve.modules = [
  //     ...(config.resolve.modules || []),
  //     path.resolve(__dirname, '../')
  //   ]

  //   config.resolve.plugins = [
  //     ...(config.resolve.plugins || []),
  //     new TsconfigPathsPlugin()
  //   ]
  //   return config;
  // },

  docs: {},
  typescript: {
    reactDocgen: 'react-docgen-typescript'
  },

  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: 'sb-vite.config.ts',
      },
    }
  }
}