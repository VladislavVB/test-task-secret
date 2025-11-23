import type { WeatherData } from '@/entities/weather-city/model/types'
import { defineStore } from 'pinia'
import { apiClient } from '@/shared/api/base'
import type { City } from '@/entities/city/city.interface'

interface WeatherCityState {
  cityList: City[]
  loading: boolean
  error: string | null
}

export const useWeatherCityStore = defineStore('weather-city', {
  state: (): WeatherCityState => ({
    cityList: [
      {
        name: 'Moscow',
      },
      { name: '11' },
      { name: 'Казань' },
      { name: 'Воронеж' },
    ],
    error: null,
    loading: false,
  }),

  actions: {
    setCityList(cityList: City[]) {
      this.cityList = cityList
    },

    deleteCity(index: number) {
      this.cityList.splice(index, 1)
    },

    addCity(cityName: string) {
      const normalizedCityName = cityName.trim()

      const cityExists = this.cityList.some(
        (city) => city.name.toLowerCase() === normalizedCityName.toLowerCase(),
      )

      if (cityExists) {
        // const error = `Город "${normalizedCityName}" уже существует в списке`
        alert('No')
        return
      }

      this.cityList.push({ name: normalizedCityName })
      return
    },

    async fetchCityWeather(cityName: string) {
      this.loading = true
      this.error = null

      try {
        const response = await apiClient.get('/weather', {
          params: {
            q: cityName,
          },
        })
        return response.data
      } catch (error: any) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async fetchMultipleCitiesWeather(cityNames: string[]) {
      this.loading = true
      this.error = null

      try {
        const promises = cityNames.map((cityName) => this.fetchCityWeather(cityName))

        const results = await Promise.allSettled(promises)

        const successfulCities: WeatherData[] = []
        const failedCities: string[] = []

        results.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            successfulCities.push(result.value as WeatherData)
          } else {
            failedCities.push(cityNames[index] as string)
          }
        })

        return successfulCities
      } catch (error: any) {
        this.error = error.message || 'Ошибка при загрузке данных для нескольких городов'
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
