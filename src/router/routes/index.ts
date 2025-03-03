/**
 * 创建、转换、处理 路由数据
 *
 */
// 引入自动生成的 auto-typed-router.d.ts 文件中的路由; NOTE 需要在 tsconfig.app.json 中添加相应的 types，否则会提示 ts 语法错误
import { routes } from 'vue-router/auto-routes'

import { transformRoutes } from '../utils/helpers'

const { VITE_LAYOUT_COMPONENT = 'base' } = import.meta.env

/**
 * @description: 创建完整的约定式路由数据及逻辑，它由 基础路由 baseRoutes 和 空白布局路由 blankLayoutRoutes 组成
 */
export function createVueRoutes() {
  try {
    // 🆎 如果 VITE_LAYOUT_COMPONENT 为 blank，则直接返回自动生成的 routes 数据
    if (VITE_LAYOUT_COMPONENT === 'blank') {
      return routes
    }

    // 🆎 如果 VITE_LAYOUT_COMPONENT 为 base，则需要对自动生成的 routes 数据进行转换
    // 1. 先转换自动生成的 routes 数据，生成 基础布局路由 baseRoutes 和 空白布局路由 blankRoutes
    const { baseRoutes, blankLayoutRoutes } = transformRoutes(routes)

    // 2. 将二者进行合并，传递给 vue-router
    return [...baseRoutes, ...blankLayoutRoutes]
  }
  catch (error: any) {
    console.error('路由创建失败:', error)
    return []
  }
}
