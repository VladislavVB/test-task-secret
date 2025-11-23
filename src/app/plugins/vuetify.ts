import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Импорт стилей
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
          background: '#FFFFFF',
          surface: '#FFFFFF',
          'on-surface': '#212121',
          'grey-100': '#F5F5F5',
          'grey-200': '#EEEEEE',
          'grey-300': '#E0E0E0',
          'grey-400': '#BDBDBD',
          'grey-500': '#9E9E9E',
          'grey-600': '#757575',
          'grey-700': '#616161',
          'grey-800': '#424242',
          'grey-900': '#212121',
        },
      },
      dark: {
        colors: {
          primary: '#2196F3',
          secondary: '#03A9F4',
          background: '#121212',
          surface: '#1E1E1E',
          'on-surface': '#FFFFFF',
          'grey-100': '#1E1E1E',
          'grey-200': '#2D2D2D',
          'grey-300': '#424242',
          'grey-400': '#616161',
          'grey-500': '#757575',
          'grey-600': '#9E9E9E',
          'grey-700': '#BDBDBD',
          'grey-800': '#E0E0E0',
          'grey-900': '#F5F5F5',
        },
      },
    },
  },
})
