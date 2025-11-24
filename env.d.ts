// env.d.ts
interface ImportMetaEnv {
  readonly VITE_WEATHER_API_KEY: string
  readonly VITE_WEATHER_URL: string
  readonly BASE_URL: string
  // добавьте другие переменные по мере необходимости
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
