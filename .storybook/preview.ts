import '../styles/app.css';
import '../styles/lexical.css';
import i18n from './i18next'
import { initialize, mswDecorator } from 'msw-storybook-addon'
import providerDecorator from './providers'

// Initialize MSW
initialize();



// Provide the MSW addon decorator globally
export const decorators = [mswDecorator, providerDecorator]

export const parameters = {
  i18n,
  locale: 'en',
  locales: {
    en: 'English',
    ja: '日本語',
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}