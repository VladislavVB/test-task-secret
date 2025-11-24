// src/app/router/index.ts
import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import WeatherCityList from '@/pages/weather/index.vue'
import SettingsCityList from '@/pages/settings/index.vue'

// Более надежное определение виджетного режима
const isWidget =
  typeof window !== 'undefined' &&
  (window.location.pathname.includes('weather.html') ||
    document.querySelector('#weather-widget-container') ||
    document.querySelector('.weather-widget-app'))

// Для виджета используем MemoryHistory, для основного приложения - WebHistory
const router = createRouter({
  history: isWidget ? createMemoryHistory() : createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'WeatherCityList',
      component: WeatherCityList,
    },
    {
      path: '/settings',
      name: 'SettingsCityList',
      component: SettingsCityList,
    },
  ],
})

// Добавим логирование для отладки
router.beforeEach((to, from, next) => {
  console.log('🔄 Router navigating:', {
    from: from.name,
    to: to.name,
    isWidget,
    history: isWidget ? 'MemoryHistory' : 'WebHistory',
  })
  next()
})

router.afterEach((to) => {
  console.log('✅ Router navigated to:', to.name)
})

export default router
