import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.config.errorHandler = (err) => {
  console.error(err);
}


import DataTable from 'datatables.net-vue3'
import DataTablesLib from 'datatables.net';
  
DataTable.use(DataTablesLib);
app.use(DataTable)


import { createI18n, type I18nOptions } from 'vue-i18n'

/**
 * import locale messages resource from json for global scope
 */
import enUS from '../locales/en-US.json'
import fiFI from '../locales/fi-FI.json'

const options: I18nOptions = {
  legacy: false,
  allowComposition: true,
  locale: 'fi-FI',
  fallbackLocale: 'en-US',
  messages: {
    'en-US': enUS,
    'fi-FI': fiFI,
  },
  datetimeFormats: {
    'fi-FI': {
      short: {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short',
        timezone: 'Asia/Tokyo'
      }
    }
  },
  numberFormats: {
    'fi-FI': {
      currency: {
        style: 'currency',
        currencyDisplay: 'symbol',
        currency: 'JPY'
      }
    }
  }
}

/**
 * setup vue-i18n with i18n resources with global type definition.
 * if you define the i18n resource schema in your `*.d.ts`, these is checked with typeScript.
 */
const i18n = createI18n<false, typeof options>(options)
app.use(i18n)



app.mount('#app')
