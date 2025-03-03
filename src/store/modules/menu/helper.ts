/**
 * 处理菜单相关的逻辑
 */
import type { RouteRecordRaw } from 'vue-router'

import { cloneDeep, pickBy } from 'es-toolkit/object'
import { orderBy } from 'es-toolkit/array'

import { builtinRoutePaths } from '@/constants/routes'
import { customMenuItems } from '@/constants/menus'

/**
 * @description: 创建基础菜单数据
 */
function createBaseMenuItem(route: RouteRecordRaw): APP.Menu.MenuItem {
  const { name, meta } = route
  return {
    key: name as string,
    label: meta?.title || name as string,
    routePath: meta?.fullPath,
    ...(meta?.menuProps || {}),
  }
}

/**
 * @description: 检查是否为目录文件（路由中没有 name 的数据即为目录文件）
 */
function isDirRoute(route: RouteRecordRaw) {
  return !route.name
}

/**
 * @description: 获取目录文件下的 index.vue 文件（路由中 path = '' 的数据）
 */
function getIndexRoute(routeChildren?: RouteRecordRaw[]) {
  return routeChildren?.find(item => !item.path)
}

/**
 * @description: 检查是否为动态路由（path 中以 : 为开头的数据）
 */
function isDynamicRoute(route: RouteRecordRaw) {
  return route.path.startsWith(':')
}

/**
 * @description: 🆎 批量将路由数据转换为菜单 👇
 */
export function convertRoutesToMenus(routes: RouteRecordRaw[]) {
  // 🆎 过滤掉内置路由，这些路由无需参与菜单转换
  const validRoutes = routes.filter(route => !builtinRoutePaths.includes(route.path))
  console.log('🆎 过滤掉内置路由', validRoutes)

  // 🆎 深度 clone 一下，别影响原 route 数据
  const clonedRoutes = cloneDeep(validRoutes)

  try {
    // 获取路由转换后的菜单
    const routeMenus = processRoutesToMenus(clonedRoutes)

    // 🆎 合并自定义菜单
    return mergeCustomMenus(routeMenus)
  }
  catch (error) {
    console.error('菜单转换失败:', error)
    return []
  }
}

/**
 * @description: 🆎 拆分：处理路由，包含 递归处理子路由，将路由数据转换成菜单数据，并进行排序
 */
function processRoutesToMenus(routes: RouteRecordRaw[]): APP.Menu.MenuItem[] {
  if (!routes.length)
    return []

  const menus = routes
    .map(routeItem => convertRouteToMenuItem(routeItem))
    .filter(Boolean) as APP.Menu.MenuItem[]

  return sortMenuItems(menus)
}

/**
 * @description: 单个路由数据转换 👇
 */
function convertRouteToMenuItem(route: RouteRecordRaw) {
  const { meta: routeMeta } = route
  const { hideInMenu = false } = routeMeta?.menuProps || {}

  // 🆎 判断菜单是否隐藏（针对非目录级别的菜单）
  if (hideInMenu)
    return null

  // 🆎 判断是否为动态路由，如果是，则直接返回 null
  if (isDynamicRoute(route)) {
    return null
  }

  let menuItem = createBaseMenuItem(route)

  // 🆎 处理目录类型路由
  if (isDirRoute(route)) {
    const dirMenuItem = handleDirRoute(route)

    if (!dirMenuItem)
      return null

    menuItem = dirMenuItem
  }

  // 🆎 过滤掉 menuItem 对象中的空值
  return pickBy(menuItem, value => Boolean(value)) as APP.Menu.MenuItem
}

/**
 * @description: 🆎 拆分：处理文件夹目录类型的路由，简言之，就是处理 文件夹目录下 index.vue 文件；
 */
function handleDirRoute(route: RouteRecordRaw) {
  const { path, children } = route

  // 获取目录下 index.vue 文件
  const indexRoute = getIndexRoute(children)

  if (!indexRoute) {
    throw new Error(`菜单转换失败：${path} 目录下缺少 index.vue 文件`)
  }

  // 🆎 index.vue 的作用不管是路由文件，还是配置文件，在生成菜单数据时，都应获取它定义的 meta 数据
  const { meta: indexRouteMeta } = indexRoute
  const { isChildMenu = true, hideInMenu = false, customLabel, ...indexMenuRest } = indexRouteMeta?.menuProps || {}

  // 如果设置了隐藏，直接返回 null
  if (hideInMenu)
    return null

  /**
   * 🆎 根据 isChildMenu 属性来做判断
   */
  // if (isChildMenu) {
  //   // 🆎 为 true 时，index.vue 是路由页面，所在目录是一个独立的 子菜单项，不应该有 children 属性
  //   console.log(`🆎 文件夹目录 ${indexRouteMeta?.fullPath} 下的 index.vue 文件是路由页面，则所在目录是一个独立的 子菜单项，不应该有 children 属性`)
  // }
  if (!isChildMenu && children?.length) {
    // 🆎 为 false 时，index.vue 只是一个配置文件，不应该作为菜单项显示，需要从 children 中删除掉
    // 🆎 index.vue 文件生成的路由数据，都会在 children 数组的第一项，所以直接删除第一项即可
    children.shift()
  }

  return {
    key: indexRoute.name as string,
    label: customLabel || indexRouteMeta?.title,
    ...(isChildMenu && { routePath: indexRouteMeta?.fullPath }), // 🆎 所在目录为 子菜单项，才有 routePath 属性
    ...(!isChildMenu && { children: processRoutesToMenus(children || []) }), // 🆎 所在目录为 折叠菜单（父级菜单），才有 children 属性
    ...indexMenuRest,
  }
}

/**
 * @description: 🆎 拆分：菜单排序 👇
 */
function sortMenuItems(items: APP.Menu.MenuItem[]): APP.Menu.MenuItem[] {
  // 🆎 确保所有菜单项都有 order 值，未设置的默认为最大值
  const itemsWithOrder = items.map(item => ({
    ...item,
    order: item.order ?? Number.MAX_SAFE_INTEGER,
  }))

  // NOTE 使用 es-toolkit 库的 orderBy 方法进行排序；🆎 asc 升序，desc - 降序
  // 🆎 多字段排序：优先按 order 排序，相同 order 的按 label 排序
  return orderBy(itemsWithOrder, ['order', 'label'], ['asc', 'asc'])
}

/**
 * @description: 🆎 合并自定义菜单 到 路由生成的菜单数据中 👇
 */
function mergeCustomMenus(menus: APP.Menu.MenuItem[]) {
  // 深拷贝菜单数据
  const result = cloneDeep(menus)

  // 递归查找并添加菜单项
  const addMenuItem = (items: APP.Menu.MenuItem[], customItem: APP.Menu.MenuItem) => {
    const { parentKey } = customItem

    // 没有父级菜单，直接添加到第一层级
    if (!parentKey) {
      items.push(customItem)
      return true
    }

    // 查找父级菜单
    for (const item of items) {
      if (item.key === parentKey) {
        // 检查父级菜单是否为菜单项，是的话不允许添加子菜单
        if (!item.children && item.routePath)
          throw new Error(`菜单合并失败：${item.label}(${item.key}) 是菜单项，不能添加子菜单`)

        // 添加子菜单项
        item.children = item.children || []
        item.children.push(customItem)
        item.children = sortMenuItems(item.children)
        return true
      }

      // 递归处理子菜单
      if (item.children?.length && addMenuItem(item.children, customItem))
        return true
    }
    return false
  }

  // 处理所有自定义菜单项
  customMenuItems.forEach(item => addMenuItem(result, item))

  return sortMenuItems(result)
}

/**
 * @description: 转换动态菜单 👇
 */
