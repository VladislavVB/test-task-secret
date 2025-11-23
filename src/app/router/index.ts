import { createRouter, createWebHistory } from 'vue-router'
import WeatherCityList from '@/pages/weather/index.vue'
import SettingsCityList from '@/pages/settings/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
