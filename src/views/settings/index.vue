<script setup lang="ts">
/**
 * 首页面
 */

/**
 * @description: 已经全局引入的 unplugin-vue-router 的插件之一，用于自定义当前页面配置，比如自定义 name、redirect（重定向）、meta、alias 等属性，会和自动生成的路由合并
 *
 * 🆎 会覆盖定义的公共的属性；
 */
definePage({
  name: 'settings',
  redirect: '/settings/menu',
  meta: {
    title: '总设置项',
    menuProps: {
      icon: '',
      customLabel: '系统设置',
      isChildMenu: false,
      order: 3,
    },
  },
})
</script>
