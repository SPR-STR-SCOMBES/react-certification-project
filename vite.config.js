import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vite.dev/config/
export default ({mode}) => {
  process.env = Object.assign(process.env, loadEnv(mode, process.cwd(), 'VITE_'))

  return defineConfig({
    base: process.env.VITE_BASE_URL || '/',
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  })
}
