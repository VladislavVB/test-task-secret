import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import WeatherCityList from '@/pages/weather/index.vue'
import SettingsCityList from '@/pages/settings/index.vue'

const isWidget =
  typeof window !== 'undefined' &&
  (window.location.pathname.includes('weather.html') ||
    document.querySelector('#weather-widget-container') ||
    document.querySelector('.weather-widget-app'))

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

export default router
