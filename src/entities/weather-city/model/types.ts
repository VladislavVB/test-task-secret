export interface WeatherData {
  coordinates: GeoCoordinates
  weatherConditions: WeatherCondition[]
  dataSource: string
  temperatureMetrics: TemperatureMetrics
  visibility: number
  wind: WindInfo
  clouds: CloudCoverage
  timestamp: number
  locationInfo: LocationInfo
  timezoneOffset: number
  cityId: number
  cityName: string
  responseCode: number
}

export interface LocationInfo {
  type: number
  locationId: number
  countryCode: string
  sunrise: number
  sunset: number
}

export interface CloudCoverage {
  cloudinessPercent: number
}

export interface WindInfo {
  speed: number
  direction: number
}

export interface TemperatureMetrics {
  current: number
  feelsLike: number
  minimum: number
  maximum: number
  pressure: number
  humidity: number
  seaLevelPressure: number
  groundLevelPressure: number
}

export interface WeatherCondition {
  conditionId: number
  category: string
  description: string
  iconCode: string
}

export interface GeoCoordinates {
  longitude: number
  latitude: number
}
