import { ref, type Ref } from 'vue'
import { storage } from '@/shared/libs/storage-utils'

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
      console.error('Error getting city:', err)
      return null
    }
  }

  const getCityByIP = async (): Promise<string | null> => {
    try {
      const response = await fetch('https://ipapi.co/json/')
      const data = await response.json()
      return data.city || null
    } catch (err) {
      console.error('Error getting city by IP:', err)
      return null
    }
  }

  const requestGeolocation = async (): Promise<void> => {
    const savedCity = storage.get<string>('userCity')
    if (savedCity) {
      city.value = savedCity
      return
    }

    isLoading.value = true
    error.value = null
    isFirstTime.value = true

    try {
      if (!navigator.geolocation) {
        throw new Error('Your browser does not support geolocation')
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
        storage.set('userCity', cityName)
      } else {
        const ipCity = await getCityByIP()
        if (ipCity) {
          city.value = ipCity
          storage.set('userCity', ipCity)
        }
      }
    } catch (err: any) {
      console.error('Geolocation error:', err)

      switch (err.code) {
        case err.PERMISSION_DENIED:
          error.value = 'Geolocation access denied'
          break
        case err.POSITION_UNAVAILABLE:
          error.value = 'Location information unavailable'
          break
        case err.TIMEOUT:
          error.value = 'Request timeout'
          break
        default:
          error.value = 'Failed to determine location'
          break
      }

      const ipCity = await getCityByIP()
      if (ipCity) {
        city.value = ipCity
        storage.set('userCity', ipCity)
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
