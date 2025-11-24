import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  if (mode === 'widget') {
    return {
      plugins: [vue()],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
      },
      build: {
        lib: {
          entry: resolve(__dirname, 'src/widget-loader.ts'),
          name: 'WeatherWidget',
          fileName: (format) => `weather-widget.${format}.js`,
          formats: ['umd'],
        },
        rollupOptions: {
          output: {
            inlineDynamicImports: true,
          },
        },
        outDir: 'dist-widget',
        emptyOutDir: true,
      },
      define: {
        'process.env.NODE_ENV': JSON.stringify('production'),
      },
    }
  }

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
