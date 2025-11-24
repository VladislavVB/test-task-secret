export interface WeatherData {
  coord: Coordinates
  weather: WeatherCondition[]
  base: string
  main: MainWeatherData
  visibility: number
  wind: WindData
  rain?: RainData
  clouds: CloudsData
  dt: number
  sys: SystemData
  timezone: number
  id: number
  name: string
  cod: number
}

export interface Coordinates {
  lon: number
  lat: number
}

export interface WeatherCondition {
  id: number
  main: string
  description: string
  icon: string
}

export interface MainWeatherData {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
  sea_level?: number
  grnd_level?: number
}

export interface WindData {
  speed: number
  deg: number
  gust?: number
}

export interface RainData {
  '1h'?: number
  '3h'?: number
}

export interface CloudsData {
  all: number
}

export interface SystemData {
  type: number
  id: number
  country: string
  sunrise: number
  sunset: number
}
