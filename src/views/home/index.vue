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
  name: 'home',
  meta: {
    title: '首页',
    menuProps: {
      icon: { name: 'Home' },
      order: 1,
    },
  },
})

const router = useRouter()

function handleClick() {
  router.push('/about')
}
</script>

<template>
  <h1>这才是真正的首页面！！！！😐😐😐😐</h1>
  <button @click="handleClick">
    点击跳转
  </button>
</template>

<style scoped></style>
