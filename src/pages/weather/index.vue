<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useWeatherCityStore } from '@/features/weather-city-list/model/weather-city-store'
import settingsBtn from '@/shared/components/settings-btn/settings-btn.vue'
import WeatherCard from '@/features/weather-city-list/ui/weather-card.vue'
import WeatherCardSkeleton from '@/features/weather-city-list/ui/weather-card-skeleton.vue'

const weatherStore = useWeatherCityStore()
const isLoading = ref(true)

onMounted(async () => {
  await weatherStore.fetchMultipleCitiesWeather()
  isLoading.value = false
})
</script>

<template>
  <settings-btn class="position-fixed mr-2" style="right: 0; z-index: 100" />

  <div>
    <WeatherCardSkeleton v-if="isLoading" />
    <template v-else>
      <template v-if="weatherStore.getWeatherCityList.length">
        <div v-for="weatherCity in weatherStore.getWeatherCityList" :key="weatherCity.name">
          <weather-card :weather-data="weatherCity" />
        </div>
      </template>
      <div v-else class="text-center my-4">Add City in Settings button</div>
    </template>
  </div>
</template>
