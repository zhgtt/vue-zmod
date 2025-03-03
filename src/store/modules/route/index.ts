/**
 * 创建路由相关的全局状态管理
 */
// import { routes } from 'vue-router/auto-routes'

import { useMenuStore } from '../menu'
// import { transformRoutesToAppMenus } from './helper'

const { VITE_LAYOUT_COMPONENT = 'base' } = import.meta.env

export const useRouteStore = defineStore(
  'route-store',
  () => {
    const menuStore = useMenuStore()

    /**
     * @description: 定义全局状态
     */
    // 路由初始化的标记
    const isInitAuthRoute = ref(false)

    // 动态路由记录
    // const dynamicRoutes = ref<RouteRecordRaw[]>([])

    // 路由权限列表
    // const accessRoutes = ref<string[]>([])

    /**
     * @description: 初始化路由配置，获取菜单数据、动态路由、权限等
     */
    async function initVueRoutes() {
      try {
        isInitAuthRoute.value = false

        // 1. 获取用户信息和权限
        // TODO 调用获取用户信息接口
        // const userInfo = await getUserInfo()
        // 2. 处理路由权限
        // await handleRouteAccess()

        // 3. 处理基础布局下的逻辑
        if (VITE_LAYOUT_COMPONENT === 'base') {
          // 初始化静态菜单
          await menuStore.initStaticMenus()
        }

        // 4. 动态添加路由
        // await handleDynamicRoutes()

        isInitAuthRoute.value = true
      }
      catch (error) {
        console.error('路由初始化失败:', error)
        throw error
      }

      isInitAuthRoute.value = false
    }

    /**
     * 处理路由权限
     */
    // async function handleRouteAccess() {
    //   try {
    //     // TODO 根据用户角色和权限过滤路由
    //     // const filteredRoutes = filterRoutesByPermission(routes, userPermissions)
    //     // accessRoutes.value = filteredRoutes
    //   }
    //   catch (error) {
    //     console.error('路由权限处理失败:', error)
    //     throw error
    //   }
    // }

    /**
     * 处理动态路由
     */
    // async function handleDynamicRoutes() {
    //   try {
    //     // TODO 获取动态路由配置
    //     // const routes = await fetchDynamicRoutes()
    //     // 动态添加路由
    //     dynamicRoutes.value.forEach((route) => {
    //       router.addRoute(route)
    //     })
    //   }
    //   catch (error) {
    //     console.error('动态路由处理失败:', error)
    //     throw error
    //   }
    // }

    /**
     * 重置路由状态
     */
    // function resetRouteStore() {
    //   isInitAuthRoute.value = false
    //   dynamicRoutes.value = []
    //   accessRoutes.value = []

    //   // 移除所有动态添加的路由
    //   dynamicRoutes.value.forEach((route) => {
    //     if (route.name) {
    //       router.removeRoute(route.name)
    //     }
    //   })
    // }

    return {
      isInitAuthRoute,
      // dynamicRoutes,
      // accessRoutes,
      initVueRoutes,
      // handleRouteAccess,
      // handleDynamicRoutes,
      // resetRouteStore,
    }
  },

  /**
   * @description: pinia 的插件配置项
   */
  {
    // 状态持久化储存插件配置
    persist: {
      key: 'route-store', // 自定义浏览器缓存数据中的 key 的值
      storage: localStorage, // 浏览器储存方式，默认为 localStorage
      pick: [], // 指定哪些状态需要持久化；🆎 [] 表示没有状态被持久化；undefined 表示所有状态都被持久化
      omit: [], // 指定哪些状态不需要持久化；🆎 [] 和 undefined 表示所有状态都被持久化
      // NOTE ... 更多配置可查看文档 https://prazdevs.github.io/pinia-plugin-persistedstate/
    },
  },
)
