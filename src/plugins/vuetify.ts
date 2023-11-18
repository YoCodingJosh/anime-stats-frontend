import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

import type { App } from 'vue'
import { createVuetify } from 'vuetify'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export function installVuetify(app: App) {
  const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'mdi', // This is already the default value - only for display purposes
    },
  })
  app.use(vuetify)
}
