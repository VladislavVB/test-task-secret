export const getWeatherIconUrl = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}

export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const getWindDirection = (degrees: number): string => {
  const directions = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ]
  const index = Math.round(degrees / 22.5) % 16
  return directions[index] as string
}

export const getWindDescription = (speed: number): string => {
  if (speed < 0.5) return 'Calm'
  if (speed < 1.5) return 'Light air'
  if (speed < 3.3) return 'Light breeze'
  if (speed < 5.5) return 'Gentle breeze'
  if (speed < 7.9) return 'Moderate breeze'
  if (speed < 10.7) return 'Fresh breeze'
  if (speed < 13.8) return 'Strong breeze'
  return 'High wind'
}

export const calculateDewPoint = (temp: number, humidity: number): number => {
  const dewPoint = temp - (100 - humidity) / 5
  return Math.round(dewPoint)
}

export const metersToKilometers = (meters: number): string => {
  return (meters / 1000).toFixed(1)
}
