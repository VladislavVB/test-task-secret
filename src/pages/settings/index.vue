<script setup lang="ts">
import type { City } from '@/entities/city/city.interface'

import { useRouter } from 'vue-router'
import { useWeatherCityStore } from '@/features/weather-city-list/model/weather-city-store'
import CityList from '@/widgets/city-list/city-list.vue'
import AddLocation from '@/widgets/add-location/add-location.vue'

const router = useRouter()
const weatherStore = useWeatherCityStore()

function goToWeatherList() {
  router.push({ name: 'WeatherCityList' })
}

function onCitiesReordered(cityes: City[]) {
  weatherStore.setCityList(cityes)
}
function addCity(city: string) {
  weatherStore.addCity(city)
}
function deleteCity(index: number) {
  weatherStore.deleteCity(index)
}
</script>

<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-2">
      <h3>Settings</h3>
      <v-btn @click="goToWeatherList" icon flat><v-icon> mdi-close </v-icon> </v-btn>
    </div>
    <city-list
      v-model:cities="weatherStore.$state.cityList"
      @cities-reordered="onCitiesReordered"
      @delete="deleteCity"
    />

    <add-location @submit="addCity" />
  </div>
</template>
