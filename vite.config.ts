import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), UnoCSS(), crx({ manifest }),],
})
