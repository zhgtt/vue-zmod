/**
 * 路由相关的类型定义
 */
import 'vue-router'

/**
 * @description: 自定义 RouteMeta 的类型，用于菜单转换的逻辑，覆盖 vue-router 中的 RouteMeta 类型
 */
declare module 'vue-router' {
  interface RouteMeta {
    // 当前路由的完整路径地址（会自动生成，可以忽略），也是对应菜单的跳转路径
    fullPath?: string

    // 当前路由页面 document 的标题，也是对应菜单的名称，也是对应父级菜单的名称
    title?: string

    // 是否为缓存路由
    keepAlive?: boolean

    // 是否进入到空白布局容器
    blank?: boolean

    // 对应菜单的配置
    menuProps?: APP.Menu.ItemConfig
  }
}
