/**
 * 对 路由 进行配置和封装，可以在 env 中自定义设置路由模式，默认是 history
 */
import type { App } from 'vue'

import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import type { Router, RouteRecordRaw, RouterHistory, RouterOptions } from 'vue-router'
import { handleHotUpdate } from 'vue-router/auto-routes'

import { createRouterGuard } from './guard' // 路由监控相关

import { createVueRoutes } from './routes'

// 🆎 添加全局的重定向路由，建议在运行的时候添加重定向，这样不会 typed-router.d.ts 自动生成
// routes.push({
//   path: '/',
//   redirect: '/',
// })

// 获取环境变量
const { VITE_ROUTER_HISTORY_MODE = 'history', VITE_BASE_URL = '/' } = import.meta.env

/**
 * @description: 定义路由模式，🆎 可以在 env 中设置是哪种模式，仅支持 hash 和 history 两种，这里以对象的形式实现，它包含的属性和值如下
 * @key history - 历史记录模式
 * @key hash - hash 模式，路径会带一个 #
 * @key memory - 适用于 node 环境和 SSR 环境的模式，不会有历史记录，不推荐在 浏览器 中使用（所以这里不推荐）
 *
 * @value createWebHistory | createWebHashHistory | createMemoryHistory - 创建路由模式，它是个函数，接受一个基础路径字符串作为参数。这个基础路径会被附加到每个路由的前面，使得整个应用可以在一个子路径下运行
 *
 * NOTE @类型解释: Record<K, T> - 这是一个泛型工具类型，它接收两个类型参数 K 和 T，并创建一个新类型，该类型的键是 K 的 联合类型 中的每个成员，值都是 T 类型
 */
const historyCreatorMap: Record<Env.RouterHistoryMode, (base?: string) => RouterHistory> = {
  history: createWebHistory,
  hash: createWebHashHistory,
}

/**
 * @description: 创建路由配置，它返回一个对象作为配置参数，该对象包含以下属性：
 * @key history - 路由模式
 * @key routes - 路由源数据，是一个数组，包含所有路由的配置信息
 */
function createRouterOptions(): RouterOptions {
  // 获取路由模式创建函数
  const historyCreator = historyCreatorMap[VITE_ROUTER_HISTORY_MODE]
  if (!historyCreator) {
    throw new Error(`不支持的路由模式: ${VITE_ROUTER_HISTORY_MODE}`)
  }

  // 显式将 createVueRoutes() 的返回值转换为 RouteRecordRaw[] 类型
  const routes = createVueRoutes() as RouteRecordRaw[]
  console.log('🚀 ~ file: index.ts:108 ~ createRouterOptions ~ routes:', routes)

  return {
    history: historyCreator(VITE_BASE_URL),
    routes,
    // 可以添加更多路由配置 👇️
    // scrollBehavior: () => ({ top: 0 }),
  }
}

/**
 * @description: 创建路由实例
 */
export function createAppRouter(): Router {
  try {
    return createRouter(createRouterOptions())
  }
  catch (error) {
    console.error('路由实例创建失败:', error)
    throw error
  }
}

// 导出路由实例
export const router = createAppRouter()

/**
 * @description: 注册 vue 的路由
 */
export async function setupRouter(app: App) {
  try {
    // 本地开发时，使路由数据能够热重载(实时更新)
    // ALERT 目前使用配置后, 只要更新路由页面文件, 就会使全局的容器, 菜单等布局失效, 需手动刷新页面（有时也需重启项目）
    if (import.meta?.hot) {
      handleHotUpdate(router)
      // handleHotUpdate(router, (newRoutes) => {
      //   // console.log('newRoutes ==== 😐😐', newRoutes)
      // })
    }

    // 注册路由
    app.use(router)

    // 创建路由监控守卫
    createRouterGuard(router)

    // 等待路由就绪
    await router.isReady() // 等待路由加载完毕，它是个异步函数，返回一个 promise
  }
  catch (error) {
    console.error('vue 路由设置失败:', error)
    throw error
  }
}
