import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'//引入element-plus
import 'element-plus/dist/index.css'//引入element-plus的css
import App from './App.vue'
import router from '@/routers/router.js'


let app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
