import './assets/main.css'
import * as BootstrapVueNext from 'bootstrap-vue-next'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

import { createApp } from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import { createPinia } from 'pinia'

const pinia = createPinia()

const app = createApp(App)
app.use(BootstrapVueNext)
app.use(router)
app.use(Vuex)
app.use(pinia)

app.use(store).mount('#app')
