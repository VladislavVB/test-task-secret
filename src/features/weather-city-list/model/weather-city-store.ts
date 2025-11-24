import type { WeatherData } from '@/entities/weather-city/weather-city.interface'
import type { City } from '@/entities/city/city.interface'
import { defineStore } from 'pinia'
import { apiClient } from '@/shared/api/base'
import { storage } from '@/shared/libs/storage-utils'

interface WeatherCityState {
  weatherCityList: WeatherData[]
  cityList: City[]
  loading: boolean
  error: string | null
}

export const useWeatherCityStore = defineStore('weather-city', {
  state: (): WeatherCityState => ({
    weatherCityList: [],
    cityList: storage.get<City[]>('cityList') || [],
    error: null,
    loading: false,
  }),

  getters: {
    getWeatherCityList(state) {
      return state.weatherCityList
    },
  },

  actions: {
    saveCityList() {
      storage.set('cityList', this.cityList)
    },

    setCityList(cityList: City[]) {
      this.cityList = cityList
      this.saveCityList()
    },

    deleteCity(index: number) {
      this.cityList.splice(index, 1)
      this.saveCityList()
    },

    async addCity(cityName: string, forceLoadCityes?: boolean) {
      const normalizedCityName = cityName.trim()

      const cityExists = this.cityList.some(
        (city) => city.name.toLowerCase() === normalizedCityName.toLowerCase(),
      )

      if (cityExists) {
        alert('Already there')
        return
      }

      this.cityList.push({ name: normalizedCityName })
      this.saveCityList()
      if (forceLoadCityes) await this.fetchMultipleCitiesWeather()
      return
    },

    async fetchCityWeather(cityName: string) {
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
    },

    async fetchMultipleCitiesWeather() {
      this.loading = true
      this.error = null

      try {
        const promises = this.$state.cityList.map((city) => this.fetchCityWeather(city.name))
        const results = await Promise.allSettled(promises)
        const successfulCities: WeatherData[] = []

        results.forEach((result) => {
          if (result.status === 'fulfilled' && result.value)
            successfulCities.push(result.value as WeatherData)
        })
        this.weatherCityList = successfulCities
      } catch (error: any) {
        this.error = error.message || 'Ошибка при загрузке данных'
      } finally {
        this.loading = false
      }
    },
  },
})
