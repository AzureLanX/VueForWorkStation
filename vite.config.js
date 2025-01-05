import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias:{
      '@': path.resolve(__dirname, './src')
    }
  },
  // 配置代理(还没用nginx的解决方法)
  server:{
    proxy:{
      '/api':{
        target:'http://localhost:8080',
        changeOrigin:true,
        rewrite:(path)=>path.replace(/^\/api/,'')
      }
    }
  }
})
