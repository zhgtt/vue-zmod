/**
 * 布局相关的常量配置
 */

import type { RouteComponent } from 'vue-router'

import BaseLayout from '@/layouts/base-layout/index.vue'
import BlankLayout from '@/layouts/blank-layout/index.vue'

/**
 * @description: 根据路由定义页面的布局组件 👇
 */
export const pageLayouts: Record<APP.Global.LayoutTypes, RouteComponent | (() => Promise<RouteComponent>)> = {
  base: BaseLayout,
  blank: BlankLayout,
} as const // NOTE @类型解释: 添加 as const 确保类型不可变

/** 默认布局配置 */
// export const defaultLayoutConfig: APP.Layout.Config = {
//   // 是否显示顶部导航栏
//   showHeader: true,
//   // 是否显示侧边栏
//   showSidebar: true,
//   // 是否显示标签栏
//   showTabs: true,
//   // 是否显示页脚
//   showFooter: true,
//   // 是否显示返回顶部按钮
//   showBackToTop: true,
//   // 是否显示全屏按钮
//   showFullscreen: true,
//   // 是否显示主题设置按钮
//   showThemeSettings: true,
// }

// /** 默认布局状态 */
// export const defaultLayoutState: APP.Layout.State = {
//   // 布局配置
//   config: defaultLayoutConfig,
//   // 是否处于全屏状态
//   isFullscreen: false,
//   // 是否处于移动端状态
//   isMobile: false,
//   // 是否处于暗黑模式
//   isDark: false,
// }
