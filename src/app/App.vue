<script setup lang="ts">
import { onMounted } from 'vue'
import { useGeolocation } from '@/shared/composables/use-geolocation'
import { storage } from '@/shared/libs/storage-utils'
import { useWeatherCityStore } from '@/features/weather-city-list/model/weather-city-store'

const { city, isFirstTime, requestGeolocation } = useGeolocation()
const weatherStore = useWeatherCityStore()

const initGeolocation = async () => {
  const savedCity = storage.get<string>('userCity')
  if (savedCity) {
    city.value = savedCity
    return
  }

  await requestGeolocation()

  if ((city.value, isFirstTime.value)) weatherStore.addCity(city.value as string, true)
}

onMounted(() => {
  initGeolocation()
})
</script>

<template>
  <v-app>
    <v-main class="pa-2">
      <router-view />
    </v-main>
  </v-app>
</template>

<style scoped>
#app {
  min-height: 100%;
  width: 100%;
}
</style>
