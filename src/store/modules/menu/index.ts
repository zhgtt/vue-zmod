/**
 * 创建菜单相关的全局状态管理
 */
import { routes } from 'vue-router/auto-routes'

import { convertRoutesToMenus } from './helper'

export const useMenuStore = defineStore(
  'menu-store',
  () => {
    /**
     * @description: 定义全局状态
     */
    // 菜单数据
    const menus = ref<APP.Menu.MenuItem[]>([])

    // const searchMenus = ref<APP.Global.Menu[]>([])

    // 面包屑导航数据
    // const breadcrumbs = []

    /**
     * @description: 根据路由数据获取所有的静态菜单
     */
    async function initStaticMenus() {
      menus.value = convertRoutesToMenus(routes)
      console.log('menus.value ==== 😐😐', menus.value)
    }

    return {
      menus,
      initStaticMenus,
    }
  },
  /**
   * @description: pinia 的插件配置项
   */
  {
    // 状态持久化储存插件配置
    persist: {},
  },
)
