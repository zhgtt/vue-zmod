/**
 * 对 nprogress 加载进度条插件 进行封装，让其方法暴露到 window 中，便全局使用
 */
import NProgress from 'nprogress'

export function setupNProgress() {
  /**
   * @description: 配置 nprogress，它接收一个对象为参数，对象中包含的属性如下 👇
   * @key easing - 动画类型，缓动效果
   * @key speed - 动画速度，单位为毫秒
   * @key showSpinner - 是否显示右侧加载 icon 动画
   * @key trickleSpeed - 自动递增间隔
   * @key minimum - 最小百分比
   * @key parent - 指定进度条的父容器，默认为 body
   */
  NProgress.configure({
    easing: 'ease-in-out',
    speed: 500,
    showSpinner: false,
    trickleSpeed: 200,
    minimum: 0.3,
    parent: 'body',
  })

  // 挂载到 window 中，需在 global.d.ts 文件中声明类型
  window.NProgress = NProgress
}
