/**
 * 路由守卫、监控、拦截 相关逻辑
 */
import type { Router } from 'vue-router'
import { createAccessRouteGuard } from './access'
import { createCommonRouteGuard } from './common'

export function createRouterGuard(router: Router) {
  try {
    // 按优先级注册路由守卫
    const guards = [
      createAccessRouteGuard, // 通用守卫配置
      createCommonRouteGuard, // 权限守卫配置
    ]

    guards.forEach(guard => guard(router))
  }
  catch (error) {
    console.error('路由守卫注册失败:', error)
    throw error
  }
}
