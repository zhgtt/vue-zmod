/**
 * 路由守卫，监控路由的 登录状态、权限 等
 */
import type { Router } from 'vue-router'

import { useRouteStore } from '@/store'

export function createAccessRouteGuard(router: Router) {
  const routeStore = useRouteStore()

  router.beforeEach(async (_to, _from, next) => {
    // 判断路由有无初始化标记（也就是只加载一次）
    // 获取路由相关的权限状态，决定路由跳转到哪个地方
    if (!routeStore.isInitAuthRoute) {
      // 对路由进行初始化
      await routeStore.initVueRoutes()
    }

    next()
  })
}
