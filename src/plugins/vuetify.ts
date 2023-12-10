import '@mdi/font/css/materialdesignicons.css';

import type { App } from 'vue';
import { createVuetify } from 'vuetify';

import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

export function installVuetify(app: App) {
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'system');
  };

  const startupTheme = localStorage.getItem('theme') === 'system' ? systemTheme : localStorage.getItem('theme') || 'light';

  const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
    },
    theme: {
      defaultTheme: startupTheme,
    },
  });

  app.use(vuetify);
}
