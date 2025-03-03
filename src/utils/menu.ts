/**
 * @description: 扁平化菜单数组
 */
export function flattenMenus(menus: APP.Menu.MenuItem[]): APP.Menu.MenuItem[] {
  return menus.reduce<APP.Menu.MenuItem[]>((acc, menu) => {
    acc.push(menu)
    if (menu.children?.length) {
      acc.push(...flattenMenus(menu.children))
    }
    return acc
  }, [])
}

/**
 * @description: 根据路由路径查找菜单项
 */
export function findMenuByPath(menus: APP.Menu.MenuItem[], path: string): APP.Menu.MenuItem | undefined {
  return flattenMenus(menus).find(menu => menu.routePath === path)
}

/**
 * @description: 获取菜单的展开路径
 */
export function getMenuOpenKeys(menus: APP.Menu.MenuItem[], path: string): string[] {
  const openKeys: string[] = []
  const findPath = (items: APP.Menu.MenuItem[], targetPath: string, parents: string[] = []) => {
    for (const item of items) {
      const currentPath = [...parents, item.key]
      if (item.routePath === targetPath) {
        openKeys.push(...parents)
        return true
      }
      if (item.children?.length && findPath(item.children, targetPath, currentPath)) {
        openKeys.push(...parents)
        return true
      }
    }
    return false
  }

  findPath(menus, path)
  return [...new Set(openKeys)]
}
