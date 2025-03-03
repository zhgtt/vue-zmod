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
  name: 'table-details',
  meta: {
    title: '表格详情',
    menuProps: {
      icon: '',
      order: 1,
    },
  },
})
</script>

<template>
  <h1>表格详情页面</h1>
  <h1>动态路由页面</h1>
</template>
