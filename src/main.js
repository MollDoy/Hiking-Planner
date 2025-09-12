import { createApp } from 'vue'
import App from './App.vue'

import "./assets/main.css"
import '@mdi/font/css/materialdesignicons.css'

import router from './router'
import store from "./store"
import vuetify from "./vuetify"
import i18n from "./i18n"

const app = createApp(App)

app.use(router)
app.use(store)
app.use(vuetify)
app.use(i18n)

app.mount('#app')
