<template>
  <settings-btn class="position-fixed mr-2" style="right: 0; z-index: 100" />
</template>

<script setup lang="ts">
import settingsBtn from '@/shared/components/settings-btn/settings-btn.vue'
import { useWeatherCityStore } from '@/features/weather-city-list/weather-city-store'
import { ref } from 'vue'

const weatherStore = useWeatherCityStore()

const res = ref([]) as any
async function getWeather() {
  const response = await weatherStore.fetchMultipleCitiesWeather(['Краснодар', 'Москва'])
  res.value = response
}
</script>
