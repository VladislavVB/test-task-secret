<script setup lang="ts">
import type { WeatherData } from '@/entities/weather-city/weather-city.interface'
import { useWeather } from '@/shared/composables/use-weather'

interface Props {
  weatherData: WeatherData
}

const props = defineProps<Props>()

const {
  temperature,
  feelsLike,
  weatherDescription,
  windInfo,
  dewPoint,
  visibility,
  getWeatherIconUrl,
} = useWeather(props.weatherData)
</script>

<template>
  <v-card class="weather-card mb-6" flat>
    <v-card-text class="pa-4">
      <h3 class="font-weight-bold mb-2">{{ weatherData.name }}, {{ weatherData.sys.country }}</h3>

      <div class="d-flex align-center mb-4">
        <div>
          <v-img
            v-if="weatherData.weather[0]"
            :src="getWeatherIconUrl(weatherData.weather[0].icon)"
            width="64"
            height="64"
            contain
            :alt="weatherDescription"
          />
        </div>
        <div class="text-h2 font-weight-regular mr-4">{{ temperature }}°C</div>
      </div>

      <div class="text-body-1 mb-4">
        Feels like {{ feelsLike }}°C.
        <template v-if="weatherDescription"> {{ weatherDescription }}. </template>
        {{ windInfo.description }}
      </div>

      <!-- Weather Details -->
      <v-row>
        <v-col cols="6">
          <div class="d-flex align-center">
            <v-icon class="mr-2" color="primary">mdi-weather-windy</v-icon>
            <div>
              <div class="text-caption text-medium-emphasis">Wind</div>
              <div class="text-body-2">{{ windInfo.speed }}m/s {{ windInfo.direction }}</div>
            </div>
          </div>
        </v-col>
        <v-col cols="6">
          <div class="d-flex align-center">
            <v-icon class="mr-2" color="primary">mdi-gauge</v-icon>
            <div>
              <div class="text-caption text-medium-emphasis">Pressure</div>
              <div class="text-body-2">{{ weatherData.main.pressure }}hPa</div>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row class="mb-2">
        <v-col cols="6">
          <div class="d-flex align-center">
            <v-icon class="mr-2" color="primary">mdi-water-percent</v-icon>
            <div>
              <div class="text-caption text-medium-emphasis">Humidity</div>
              <div class="text-body-2">{{ weatherData.main.humidity }}%</div>
            </div>
          </div>
        </v-col>
        <v-col cols="6">
          <div class="d-flex align-center">
            <v-icon class="mr-2" color="primary">mdi-thermometer</v-icon>
            <div>
              <div class="text-caption text-medium-emphasis">Dew point</div>
              <div class="text-body-2">{{ dewPoint }}°C</div>
            </div>
          </div>
        </v-col>
      </v-row>

      <div class="d-flex align-center">
        <v-icon class="mr-2" color="primary">mdi-eye</v-icon>
        <div>
          <div class="text-caption text-medium-emphasis">Visibility</div>
          <div class="text-body-2">{{ visibility }}km</div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
