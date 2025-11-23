import { createApp } from 'vue'
import App from '@/app/App.vue'
import router from '@/app/router/index'
import vuetify from '@/app/plugins/vuetify'
import { loadFonts } from '@/app/plugins/webfontloader'
import { createPinia } from 'pinia'
import '@/app/assets/css/main.css'

loadFonts()
const pinia = createPinia()
createApp(App).use(router).use(pinia).use(vuetify).mount('#app')
