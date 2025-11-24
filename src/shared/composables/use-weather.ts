import { computed } from 'vue'
import type { WeatherData } from '@/entities/weather-city/model/types'
import {
  getWeatherIconUrl,
  capitalizeFirst,
  getWindDirection,
  getWindDescription,
  calculateDewPoint,
  metersToKilometers,
} from '@/shared/libs/weather-utils'

export function useWeather(weatherData: WeatherData) {
  const temperature = computed(() => Math.round(weatherData.main.temp))
  const feelsLike = computed(() => Math.round(weatherData.main.feels_like))
  const weatherDescription = computed(() =>
    weatherData.weather[0] ? capitalizeFirst(weatherData.weather[0].description) : '',
  )
  const windInfo = computed(() => ({
    speed: weatherData.wind.speed,
    direction: getWindDirection(weatherData.wind.deg),
    description: getWindDescription(weatherData.wind.speed),
  }))
  const dewPoint = computed(() =>
    calculateDewPoint(weatherData.main.temp, weatherData.main.humidity),
  )
  const visibility = computed(() => metersToKilometers(weatherData.visibility))

  return {
    temperature,
    feelsLike,
    weatherDescription,
    windInfo,
    dewPoint,
    visibility,
    getWeatherIconUrl,
    capitalizeFirst,
  }
}
