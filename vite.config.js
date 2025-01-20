import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"; 
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
// https://vite.dev/config/
export default ({ mode }) => {
  const root = process.cwd();
  const viteEnv = loadEnv(mode, root);

  return defineConfig({
    server: {
      proxy: {
        '/api': {
          target: viteEnv.VITE_APP_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      ElementPlus(),
      Icons({
        resolvers: [ElementPlusResolver()],
      })
    ],
    resolve: {
      // src 别名配置
      alias: {
        "@": resolve(__dirname, "src"),
      }
  }
})
}
