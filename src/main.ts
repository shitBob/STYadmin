import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import piniaPersistedstate from 'pinia-plugin-persistedstate';
import { createPinia } from 'pinia'
import router from './router'

const app = createApp(App)
app.use(router)
const pinia = createPinia()
pinia.use(piniaPersistedstate);
app.use(pinia)
app.use(ElementPlus)
app.mount('#app')


