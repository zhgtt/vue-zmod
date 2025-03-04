/**
 * 布局相关的类型定义
 */

declare namespace APP.Layout {
  // 布局类型
  type LayoutTypes = 'base' | 'blank'

  // 布局组件的 Props 类型
  interface LayoutProps {
    // 是否显示侧边栏
    showSidebar?: boolean

    // 是否显示头部
    showHeader?: boolean

    // 是否显示标签栏
    showTabs?: boolean

    // 是否显示页脚
    showFooter?: boolean

    // 是否显示返回顶部按钮
    showBackTop?: boolean

    // 是否显示设置抽屉
    showSettingDrawer?: boolean
  }

  // 布局配置类型
  interface LayoutConfig extends LayoutProps {
    // 布局类型
    type: LayoutTypes

    // 主题色
    primaryColor?: string

    // 是否开启暗黑模式
    darkMode?: boolean

    // 内容区域宽度（固定宽度或者流式宽度）
    contentWidth?: 'fixed' | 'fluid'

    // 导航模式
    navMode?: 'side' | 'top' | 'mix'

    // 菜单主题
    menuTheme?: 'light' | 'dark'
  }
}
