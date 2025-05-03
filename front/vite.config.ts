import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { version } from './package.json'

const resolve = (p: string) => path.resolve(__dirname, `src/${p}`)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  define: {
    __APP_VERSION__: JSON.stringify(version),
    'process.env': {}
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    }
  },
  resolve: {
    alias: {
      '@/components': resolve('components'),
      '@/utils': resolve('utils'),
    }
  }
})
