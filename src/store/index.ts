/**
 * 对 全局的状态管理 进行配置和封装
 */
import type { App } from 'vue'

import { createPinia } from 'pinia'

/**
 * @description: pinia 的持久化储存插件，能够便捷的将一些全局状态放到浏览器缓存中，实现持久化储存
 */
import piniaPluginPersistence from 'pinia-plugin-persistedstate'

// 导出所有store模块
export * from './modules/route'

/**
 * @description: 初始化 Pinia store
 * @param app - Vue 应用实例
 */
export function setupStore(app: App) {
  try {
    const pinia = createPinia()

    // 注册 pinia 持久化插件
    pinia.use(piniaPluginPersistence)

    app.use(pinia)
  }
  catch (error) {
    console.error('pinia store 设置失败:', error)
    throw error
  }
}
