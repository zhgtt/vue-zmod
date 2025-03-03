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
  name: 'ui-component',
  redirect: '/ui-components/button',
  meta: {
    title: 'UI 组件',
    menuProps: {
      icon: 'eee',
      isChildMenu: false,
      order: 2,
    },
  },
})

const router = useRouter()

function handleClick() {
  router.push('/about')
}
</script>
