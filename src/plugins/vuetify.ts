/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify, ThemeDefinition } from 'vuetify';

const fgLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#574513',
    secondary: '#7f8c8d',
    accent: '#ff5722',
    error: '#e91e63',
    warning: '#ffc107',
    info: '#00bcd4',
    success: '#4caf50',
    danger: '#f44336',
    background: '#FFFAF0FF',
  },
}

const fgDarkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: '#9c7e31',
    secondary: '#bdc3c7',
    accent: '#ff8a50',
    error: '#f06292',
    warning: '#ffca28',
    info: '#26c6da',
    success: '#66bb6a',
    danger: '#ef5350',
    background: '#424242',
  },
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'fgLightTheme',
    themes: {
      fgLightTheme,
      fgDarkTheme,
    },
  },
})
