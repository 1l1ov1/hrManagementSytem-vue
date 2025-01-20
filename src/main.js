import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import { router } from "./router/index";
import { createPinia } from "pinia";
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import "element-plus/dist/index.css"

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
createApp(App).use(pinia).use(router).use(ElementPlus, {
    locale: zhCn,
  }).mount('#app')
