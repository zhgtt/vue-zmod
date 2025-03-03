// 主应用页面 👇
import type { App as VueApp } from 'vue'
import App from './App.vue'

// 引入第三方插件的注册方法、静态资源 👇
import './plugins/assets'
import { setupNProgress } from './plugins'

// 引入自定义的注册方法，如 路由、状态管理 等 👇
import { setupRouter } from './router'
import { setupStore } from './store'

// 引入全局 css 资源 👇
import './styles/global.css' // 全局 css

/**
 * @description: 应用初始化配置
 */
async function setupPlugins(app: VueApp) {
  // 初始化进度条
  setupNProgress()

  // 初始化状态管理
  setupStore(app)

  // 初始化路由
  await setupRouter(app)
}

/**
 * @description: 启动应用
 */
async function bootstrap() {
  try {
    // 挂载全局 app 节点
    const app = createApp(App)

    // 初始化插件
    await setupPlugins(app)

    // 挂载应用
    app.mount('#app')

    // TODO 给下面这行 log 加样式
    console.log('😄😄😄 应用启动成功 😄😄😄')
  }
  catch (error) {
    console.error('应用启动失败:', error)
  }
}

// 启动
bootstrap().catch((error) => {
  console.error('Vue 应用启动过程出错:', error)
})
