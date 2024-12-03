import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


// https://vite.dev/config/
export default defineConfig({
  base: '/admin',
  plugins: [vue()],
  resolve: {
    alias: {
        '@': '/src'
    }
},
  css: {
    preprocessorOptions: {
      scss: { api: 'modern-compiler' },
      
    }
  }
})
