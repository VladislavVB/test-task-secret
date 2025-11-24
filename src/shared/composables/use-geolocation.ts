import { ref, type Ref } from 'vue'

interface GeolocationOptions {
  enableHighAccuracy?: boolean
  timeout?: number
  maximumAge?: number
}

interface GeolocationResult {
  city: Ref<string | null>
  coordinates: Ref<{ lat: number; lon: number } | null>
  isLoading: Ref<boolean>
  error: Ref<string | null>
  isFirstTime: Ref<boolean>
  requestGeolocation: () => Promise<void>
}

export const useGeolocation = (options: GeolocationOptions = {}): GeolocationResult => {
  const city = ref<string | null>(null)
  const coordinates = ref<{ lat: number; lon: number } | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const isFirstTime = ref(false)

  const defaultOptions: GeolocationOptions = {
    enableHighAccuracy: false,
    timeout: 10000,
    maximumAge: 60000,
    ...options,
  }

  // Функция для получения города по координатам
  const getCityByCoordinates = async (lat: number, lon: number): Promise<string | null> => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=ru`

      const response = await fetch(url)
      const data = await response.json()

      return (
        data.address?.city ||
        data.address?.town ||
        data.address?.village ||
        data.address?.municipality ||
        null
      )
    } catch (err) {
      console.error('Ошибка при получении города:', err)
      return null
    }
  }

  const getCityByIP = async (): Promise<string | null> => {
    try {
      const response = await fetch('https://ipapi.co/json/')
      const data = await response.json()
      return data.city || null
    } catch (err) {
      console.error('Ошибка при получении города по IP:', err)
      return null
    }
  }

  const requestGeolocation = async (): Promise<void> => {
    const savedCity = localStorage.getItem('userCity')
    if (savedCity) {
      city.value = savedCity
      return
    }

    isLoading.value = true
    error.value = null
    isFirstTime.value = true

    try {
      if (!navigator.geolocation) {
        throw new Error('Ваш браузер не поддерживает геолокацию')
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, defaultOptions)
      })

      const lat = position.coords.latitude
      const lon = position.coords.longitude

      coordinates.value = { lat, lon }

      const cityName = await getCityByCoordinates(lat, lon)

      if (cityName) {
        city.value = cityName
        localStorage.setItem('userCity', cityName)
      } else {
        const ipCity = await getCityByIP()
        if (ipCity) {
          city.value = ipCity
          localStorage.setItem('userCity', ipCity)
        }
      }
    } catch (err: any) {
      console.error('Ошибка геолокации:', err)

      switch (err.code) {
        case err.PERMISSION_DENIED:
          error.value = 'Доступ к геолокации запрещен'
          break
        case err.POSITION_UNAVAILABLE:
          error.value = 'Информация о местоположении недоступна'
          break
        case err.TIMEOUT:
          error.value = 'Время запроса истекло'
          break
        default:
          error.value = 'Не удалось определить местоположение'
          break
      }

      const ipCity = await getCityByIP()
      if (ipCity) {
        city.value = ipCity
        localStorage.setItem('userCity', ipCity)
        error.value = null
      }
    } finally {
      isLoading.value = false
    }
  }

  return {
    city,
    coordinates,
    isLoading,
    error,
    isFirstTime,
    requestGeolocation,
  }
}
