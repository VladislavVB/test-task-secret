class LocalStorageManager {
  get<T>(key: string, defaultValue: T | null = null): T | null {
    try {
      const item = localStorage.getItem(key)
      if (item === null) return defaultValue

      try {
        return JSON.parse(item) as T
      } catch {
        return item as T
      }
    } catch (error) {
      console.error('LocalStorage get error:', error)
      return defaultValue
    }
  }

  set<T>(key: string, value: T): boolean {
    try {
      const serializedValue = JSON.stringify(value)
      localStorage.setItem(key, serializedValue)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  remove(key: string): boolean {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  clear(): boolean {
    try {
      localStorage.clear()
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  has(key: string): boolean {
    return localStorage.getItem(key) !== null
  }

  keys(): string[] {
    const keys: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key) keys.push(key)
    }
    return keys
  }
}

export const storage = new LocalStorageManager()
export default storage
