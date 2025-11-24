import type { WeatherData } from '@/entities/weather-city/weather-city.interface'
import type { City } from '@/entities/city/city.interface'
import { defineStore } from 'pinia'
import { apiClient } from '@/shared/api/base'
import { storage } from '@/shared/libs/storage-utils'
import { ref, computed } from 'vue'

export const useWeatherCityStore = defineStore('weather-city', () => {
  // State
  const weatherCityList = ref<WeatherData[]>([])
  const cityList = ref<City[]>(storage.get<City[]>('cityList') || [])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const getWeatherCityList = computed(() => weatherCityList.value)

  // Actions
  const saveCityList = () => {
    storage.set('cityList', cityList.value)
  }

  const setCityList = (cities: City[]) => {
    cityList.value = cities
    saveCityList()
  }

  const deleteCity = (index: number) => {
    cityList.value.splice(index, 1)
    saveCityList()
  }

  const addCity = async (cityName: string, forceLoadCityes?: boolean) => {
    const normalizedCityName = cityName.trim()

    const cityExists = cityList.value.some(
      (city) => city.name.toLowerCase() === normalizedCityName.toLowerCase(),
    )

    if (cityExists) {
      alert('Already there')
      return
    }

    cityList.value.push({ name: normalizedCityName })
    saveCityList()
    if (forceLoadCityes) await fetchMultipleCitiesWeather()
    return
  }

  const fetchCityWeather = async (cityName: string) => {
    try {
      const response = await apiClient.get('/weather', {
        params: {
          q: cityName,
        },
      })
      return response.data
    } catch (error: any) {
      console.error(error)
    }
  }

  const fetchMultipleCitiesWeather = async () => {
    loading.value = true
    error.value = null

    try {
      const promises = cityList.value.map((city) => fetchCityWeather(city.name))
      const results = await Promise.allSettled(promises)
      const successfulCities: WeatherData[] = []

      results.forEach((result) => {
        if (result.status === 'fulfilled' && result.value)
          successfulCities.push(result.value as WeatherData)
      })
      weatherCityList.value = successfulCities
    } catch (error: any) {
      error.value = error.message || 'Ошибка при загрузке данных'
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    weatherCityList,
    cityList,
    loading,
    error,

    // Getters
    getWeatherCityList,

    // Actions
    saveCityList,
    setCityList,
    deleteCity,
    addCity,
    fetchCityWeather,
    fetchMultipleCitiesWeather,
  }
})
