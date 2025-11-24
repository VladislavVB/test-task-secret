import { createApp } from 'vue'
import App from '@/app/App.vue'
import router from '@/app/router/index'
import vuetify from '@/app/plugins/vuetify'
import { loadFonts } from '@/app/plugins/webfontloader'
import { createPinia } from 'pinia'
import { vAutoFocus } from '@/shared/directives/auto-focus'
import '@/app/assets/css/main.css'

function initWeatherWidget() {
  let container = document.querySelector('weather-widget')

  if (!container) {
    container = document.createElement('div')
    container.id = 'weather-widget-container'
    container.className = 'weather-widget-app'
    document.body.appendChild(container)
  }

  loadFonts()

  const pinia = createPinia()
  const app = createApp(App)

  app.use(router).use(pinia).use(vuetify).directive('auto-focus', vAutoFocus).mount(container)

  console.log('Weather Widget mounted successfully!')
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWeatherWidget)
} else {
  initWeatherWidget()
}
