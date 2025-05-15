import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { version } from './package.json'

const resolvePath = (p: string) => path.resolve(__dirname, "src", p);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
  },
  define: {
    __APP_VERSION__: JSON.stringify(version),
    "process.env": {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
  resolve: {
    alias: {
      "@components": resolvePath("components"),
      "@services": resolvePath("services"),
      "@utils": resolvePath("utils"),
    },
  },
});
