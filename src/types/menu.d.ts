/**
 * 菜单相关的类型定义
 */
declare namespace APP.Menu {
  // 菜单项的基本属性
  interface BaseItem {
    // 菜单项的唯一标识
    key: string

    // 菜单项的显示文本
    label?: string

    // 跳转的路由路径
    routePath?: string

    // 菜单项的子菜单
    children?: MenuItem[] | RouteRecordRaw[]
  }

  // 在路由页面中定义的菜单配置项类型
  interface ItemConfig {
    // 对应菜单的图标
    icon?: string

    // 对应菜单的排序，必须大于 0，不设置的话默认为 最大值
    order?: number

    // 指定菜单跳转方式
    target?: 'self' | '_blank'

    // 是否禁用菜单，默认为 false
    disabled?: boolean

    // 如果不想使用路由指定的 title 属性作为菜单名称，可以自行定义 菜单名称
    customLabel?: string

    // 是否隐藏该菜单，默认为 false
    hideInMenu?: boolean

    // 指定其所在的文件夹目录是否为 单独的子菜单项，默认为 true；（🆎 仅在 index.vue 设置中才有效，推荐 一个文件夹代表一个子菜单项）
    isChildMenu?: boolean

    // 对应路由的参数，如果设置的话，点击菜单进入该路由，会自动携带该参数
    query?: Record<string, string>

    // 对应菜单的外链地址（仅在自定义菜单时生效，在 .vue 文件中定义无效）
    href?: string

    // 指定父级菜单的 key，用于自定义菜单时，指定其父级菜单
    parentKey?: string

    // 菜单权限标识
    // permission?: string
  }

  // 完整的菜单项类型
  type MenuItem = BaseItem & ItemConfig

  // 菜单状态
  interface State {
    // 菜单列表
    items: MenuItem[]

    // 当前选中的菜单项
    selectedKeys: string[]

    // 当前展开的菜单项
    openKeys: string[]

    // 菜单是否折叠
    collapsed: boolean
  }
}
