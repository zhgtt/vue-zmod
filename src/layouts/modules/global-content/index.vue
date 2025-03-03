<script setup lang="ts">
/**
 * 主体内容展示区域
 */
defineOptions({
  name: 'GlobalContent',
})
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <!--    <Transition> -->
    <!--      <KeepAlive> -->
    <component :is="Component" />
    <!--      </KeepAlive> -->
    <!--    </Transition> -->
  </RouterView>
</template>

<style scoped></style>
