<script setup lang="ts">
/**
 * 封装 图标 组件，支持 自定义 svg 图标、以及引入各大图标库，如 iconify 等
 */
import type { CSSProperties } from 'vue'

import { Icon } from '@iconify/vue'

import type { IIconBase } from '@icon-park/vue-next/es/runtime'
import { IconPark } from '@icon-park/vue-next/es/all'

/**
 * @description: 重新定义 IconPark 的属性类型 👇
 * @key theme - 图标主题，支持 'outline' | 'filled' | 'two-tone' | 'multi-color'；默认为 outlined
 * @key fill - 图标颜色，多色的图标就传 数组
 * @key size - 图标大小，默认为 1em（16px），🆎 这里会被 class 或者 style 定义的样式所覆盖
 *
 * NOTE @类型解释: Pick<> - 提取某些属性，组成新的类型
 */
type NewIIconBase = Pick<IIconBase, 'theme' | 'fill' | 'size'>

// 定义组件属性类型
export interface Props {
  type?: 'local' | 'iconify' | 'icon-park' // 图标类型，默认为 local
  name: string // 图标名称
  iconOption?: NewIIconBase // icon-park 配置项
}

defineOptions({
  name: 'SvgIcon',
  inheritAttrs: false, // 不继承父组件的任何属性
})

const props = withDefaults(defineProps<Props>(), {
  type: 'local',
})

// 获取组件的内置属性
const attrs = useAttrs()
const bindAttrs = computed<{ class: string, style: CSSProperties }>(() => {
  return {
    class: (attrs.class as string) || '',
    style: (attrs.style as CSSProperties) || '',
  }
})

// 定义本地项目中的图标 name
const symbolId = computed(() => {
  const { VITE_ICON_LOCAL_PREFIX: prefix } = import.meta.env // 前缀名称，可在 env 中自定义

  const iconName = props.name || 'no-icon'

  return `#${prefix}-${iconName}`
})
</script>

<template>
  <!-- 本地 svg，默认为 16px -->
  <template v-if="type === 'local'">
    <svg aria-hidden="true" width="1em" height="1em" v-bind="bindAttrs">
      <use :xlink:href="symbolId" fill="currentColor" />
    </svg>
  </template>

  <!-- iconify 图标库 -->
  <template v-if="type === 'iconify'">
    <Icon :icon="name" v-bind="bindAttrs" />
  </template>

  <!-- IconPark 图标库 -->
  <template v-if="type === 'icon-park'">
    <IconPark :type="name" v-bind="{ ...iconOption, ...bindAttrs }" />
  </template>
</template>

<style scoped></style>
