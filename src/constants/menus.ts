/**
 * 菜单相关的常量定义
 */

/** 自定义菜单项（所有的属性都自行配置，用来定义一些不需要页面的菜单，如 外链） */
export const customMenuItems: APP.Menu.MenuItem[] = [
  {
    key: 'github',
    label: 'GitHub 仓库',
    href: 'https://github.com',
    parentKey: 'learning',
    order: 3,
  },
  {
    key: 'naive-ui',
    label: 'Naive-UI 组件库',
    href: 'https://www.naiveui.com/zh-CN/light',
    parentKey: 'learning',
    order: 2,
  },
]

/** 默认菜单状态 */
// export const defaultMenuState: APP.Menu.State = {
//   items: baseMenuItems,
//   selectedKeys: [],
//   openKeys: [],
//   collapsed: false,
// }
