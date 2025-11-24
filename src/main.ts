import { createApp } from 'vue'
import App from '@/app/App.vue'
import router from '@/app/router/index'
import vuetify from '@/app/plugins/vuetify'
import { loadFonts } from '@/app/plugins/webfontloader'
import { createPinia } from 'pinia'
import { vAutoFocus } from '@/shared/directives/auto-focus'
import '@/app/assets/css/main.css'

loadFonts()
const pinia = createPinia()
const app = createApp(App)
app.use(router).directive('auto-focus', vAutoFocus).use(pinia).use(vuetify).mount('#app')
