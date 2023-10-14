import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default (mode) => {
  return defineConfig({
    base: '/vue3-admin-template/',
    // base: './',
    server: {
      open: true,
      proxy: {
        '/api': {
          // target: 'https://xxxx', // 开发环境
          target: 'http://192.168.0.78:8080', // 测试环境
          // target: 'https://xxxx', // 预发环境
          // target: 'https://xxxx', // 生产环境
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        '/gitee': {
          target: 'https://raw.githubusercontent.com/zhihuifanqiechaodan',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/gitee/, '')
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      },
      extensions: ['.vue', '.js']
    },
    esbuild: {
      drop:
        loadEnv(mode, process.cwd()).VITE_NODE_ENV === 'production'
          ? ['console', 'debugger']
          : []
    },
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(process.cwd(), 'src/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]'

        /**
         * 自定义插入位置
         * @default: body-last
         */
        // inject?: 'body-last' | 'body-first'

        /**
         * custom dom id
         * @default: __svg__icons__dom__
         */
        // customDomId: '__svg__icons__dom__',
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  })
}
