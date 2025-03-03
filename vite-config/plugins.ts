/**
 * vite 相关的所有插件都在这里定义 & 注册
 */
import type { PluginOption } from 'vite'

import path from 'node:path'
import process from 'node:process'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCss from 'unocss/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

/**
 * 以下是和 按需自动引入 相关的插件 👇
 * @plugin unplugin-auto-import - 插件会自动引入 常用 API，如 vue、vue-router、pinia 等，无需手动引入；
 * @plugin unplugin-vue-router - 插件会自动根据 src/views 下的 vue 文件，生成对应的路由，无需手动写入
 * @plugin unplugin-vue-components - 插件会自动引入 src/components 下的所有组件（组件中需要定义 name），及第三方 UI 组件外
 */
import AutoImport from 'unplugin-auto-import/vite'
import AutoVueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router' // 🆎 因为使用了 unplugin-vue-components 插件，所以注册时要用 VueRouterAutoImports 替换 vue-router
import AutoComponents from 'unplugin-vue-components/vite'
// TODO 引入所支持的 UI 组件库的解析器
// import {  } from 'unplugin-vue-components/resolvers'

/**
 * @description: 封装 vite 插件的引入和注册 👇
 * @param viteEnv - vite 环境变量
 * @param isBuild - 是否为打包状态，默认为 false（目前还用不到）
 */
export function setupVitePlugins(viteEnv: Env.ImportMeta) {
  // 获取环境变量
  const { VITE_ICON_LOCAL_PREFIX = 'local-icon' } = viteEnv

  const localIconPath = path.join(process.cwd(), 'src/assets/svg-icons')

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    /**
     * @description: 根据文件自动注入路由
     * @key routesFolder - 指定路由页面存放的目录, 可以是一个数组, 默认为 src/views，🆎 也就是这个目录下所有的 .vue 文件都会被自动注册为路由
     * @key exclude - 指定哪些目录下的文件不需要自动注册为路由
     * @key dts - 指定插件自动生成的路由 d.ts 类型文件路径
     * @key extensions - 哪些文件可以被视为路由页面, 默认为 .vue
     * @key extendRoute - 扩展路由，可以给路由添加公共的属性，如 alias（路由别名）、meta（路由配置项）、fullPath（完整路径） 等
     *
     * ALERT vue 的注入必须在 AutoVueRouter 之后
     */
    AutoVueRouter({
      routesFolder: [
        {
          src: 'src/views',
        },
      ],
      exclude: ['src/views/**/components'],
      dts: 'src/types/auto-typed-router.d.ts', // 这个文件会自动生成
      extensions: ['.vue'],
      async extendRoute(route) {
        const { component, fullPath } = route
        if (component) {
          // 给含有组件的路由，添加 meta 属性
          route.addToMeta({ fullPath })
        }
      },
    }),

    vue(),
    vueJsx(), // 支持 jsx 书写组件; NOTE 需要在 tsconfig.app.json 中配置 jsxImportSource 属性，然后再重启编辑器，防止编写时出现类型错误
    UnoCss(),

    /**
     * @description: 自动引入常用 API
     * @key dts - 指定插件自动生成的 d.ts 类型文件路径
     * @key imports - 指定哪些依赖包可以自动引入，是个数组，🆎 该插件并不是所有依赖和 API 都能默认支持，它支持的依赖查看 https://github.com/unplugin/unplugin-auto-import/tree/main/src/presets
     * @key dirs - 指定哪些目录下的文件可以自动引入，是个数组，一般是项目中自己封装的 hooks、utils、composables 等
     */
    AutoImport({
      dts: 'src/types/auto-import.d.ts', // 这个文件会自动生成
      imports: [
        'vue',
        VueRouterAutoImports,
        'pinia',
        // 自定义指定哪些第三方依赖包，如 vueuse、alova 等，🆎 建议这里只引入一些常用的 API 👇
        {
          'alova/client': ['useRequest'],
        },
        // 按需引入插件的 type 类型 API 👇
        // {
        //   from: 'vue-router',
        //   imports: ['RouteLocationRaw'],
        //   type: true,
        // },
      ],
      dirs: [],
    }),

    /**
     * @description: 自动引入 UI 组件
     * @key dts - 指定插件自动生成的 d.ts 文件路径，默认是根目录（无需自己手动创建）
     * @key resolvers - 解析器，用来解析所支持的 UI 组件库，🆎 需自行添加
     */
    AutoComponents({
      dts: 'src/types/auto-components.d.ts', // 这个文件会自动生成
      resolvers: [],
    }),

    /**
     * @description: 自动引入 svg 图标，注册该该插件之后，还需在 main.ts 中引入对应的脚本
     * @key iconDirs - 指定 svg 图标在项目中存放的目录
     * @key symbolId - 配置生成的 symbolId 的格式，默认为 icon-[dir]-[name]
     * @key inject - 配置在哪个标签中插入 svg 图标，默认为 body
     * @key customDomId - 自定义 svg 这个 DOM 的 id，默认为 __svg__icons__dom__
     */
    createSvgIconsPlugin({
      iconDirs: [localIconPath],
      symbolId: `${VITE_ICON_LOCAL_PREFIX}-[dir]-[name]`, // 🆎 图标前缀可在 env 中自定义，默认为 local-icon
      inject: 'body-last',
      customDomId: '__SVG_LOCAL_ICONS__',
    }),
  ]

  return vitePlugins
}
