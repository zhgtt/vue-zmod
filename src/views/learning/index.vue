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
  name: 'learning',
  redirect: '/learning/vue3',
  meta: {
    title: '学习资料',
    menuProps: {
      icon: 'eee',
      isChildMenu: false,
      order: 5,
    },
  },
})
</script>
