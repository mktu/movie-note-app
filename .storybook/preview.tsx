import '../styles/app.css';
import '../styles/lexical.css';
import i18n from './i18next'
import { Preview } from '@storybook/react';
import { initialize, mswDecorator } from 'msw-storybook-addon'
import providerDecorator from './providers'

// Initialize MSW
initialize();



// Provide the MSW addon decorator globally
export const decorators = [mswDecorator, providerDecorator]

const parameters = {
  i18n,
  locale: 'en',
  locales: {
    en: 'English',
    ja: '日本語',
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

const tags = ['autodocs', 'autodocs'];

const preview: Preview = {
  decorators,
  parameters,
  tags
};

export default preview;