# Vue3 空壳子项目

> 📢 **说明**

1. 学习项目之一。。
2. 主要借鉴学习 [soybean-admin](https://github.com/soybeanjs/soybean-admin)，这是个优秀的项目；
3. 该项目主要包含一些基础的配置项和插件，是一个能拿来直接使用的模板，继续开发和完善；
4. [个人笔记 - 语雀]()

---

## 项目目录（基本） 🗂️

```bash
├──📁.vscode                # 项目 vscode 的配置
├──📁public                 # 静态资源 该目录下静态资源应该避免被项目 js 引用
├──📁src                    # 源代码
│   ├──📁api                    # 接口请求
│   │   ├──📁methods                # 业务接口文件，所有的接口都放在这里
│   ├──📁assets                 # 图片，字体等静态资源
│   │   ├──📁svg-icons              # 存放本地 svg 图标的目录
│   ├──📁components             # 项目公共组件
│   │   ├──📁common                 # 全局使用的公共组件，如 主题切换、logo 等
│   │   ├──📁custom                 # 自定义全局组件，如 SvgIcon 等
│   ├──📁constants              # 项目全局常量
│   ├──📁hooks                  # 项目全局 hooks 钩子函数
│   ├──📁layouts                # 页面布局组件
│   ├──📁plugins                # 项目中使用到的插件配置，如 UI 组件库、国际化 等
│   │   ├──📄assets.ts              # 引入第三方插件的静态资源
│   ├──📁router                 # 路由
│   ├──📁store                  # 状态管理
│   ├──📁types                # 声明 ts 类型的文件
│   ├──📁styles                 # 全局 css 文件
│   ├──📁utils                  # 项目公共方法、工具
│   ├──📁views                  # 页面文件
│   │   ├──📁_builtin               # 一些内置的页面组件放在这里，如 404 等
│   ├──📄App.vue                # 入口页面
│   └──📄main.ts                # 入口 加载组件 初始化
├──📁vite-config            # vite 拆分出的配置项，如 proxy、plugins 等
│   ├──📄plugins.ts             # vite 相关的插件配置
├──📄.env                   # 环境变量（公共环境，不区分，定义一些公共的变量，也可以是开发环境）
├──📄.env.production        # 环境变量（生产环境）
├──📄.env.test              # 环境变量（测试环境）
├──📄.gitignore             # 定义 git 过滤的文件
├──📄eslint.config.js       # eslint 配置文件
├──📄index.html             # 主页面
├──📄package.json           # 依赖、脚本文件
├──📄pnpm-lock.yaml         # pnpm 本地依赖
├──📄README.md              # 项目说明文件
├──📄tsconfig.app.js        # tsconfig 对项目应用的配置文件
├──📄tsconfig.json          # tsconfig 配置文件
├──📄tsconfig.node.json     # tsconfig 对 node 环境配置文件
├──📄uno.config.ts          # unocss 配置文件
└──📄vite.config.ts         # vite 配置文件
```

> 📢 **说明**

1. 基本的目录文件已形成，每个文件都有自己的作用和分工，如 `src/plugins`、`src/hooks`、`src/types` 等等；
2. 每个文件都有对应的注释，方便理解；
3. 对核心文件 `vite.config.ts` 和 `main.ts` 进行了封装以及详细的注释；

---

## 拥有的功能点 & 配置 🚀

以下是该壳子期望拥有的功能点和配置项，可以继续进行拓展开发，持续更新中...

### 🙃 环境变量

项目中有一些 **全局的配置项**，如 路由模式、本地图标前缀 等，都放在了 `.env` 文件中，可以根据自己的需求进行配置；

### 🤔 eslint 代码检查 & 格式化

支持 eslint 代码检查和格式化，由 [@antfu/eslint-config](https://github.com/antfu/eslint-config) 插件支持，该插件内置了很多常用的 eslint 规则，包括 ts、vue 等；

### 🤨 git 代码提交检查 & 规范

1. 支持 git 提交时，对代码进行 eslint 检查，以及 commit 提交信息规范；**建议由命令行进行操作**；
2. 可以选择跳过代码检查和提交规范，提交时写成以下命令即可；

```bash
git commit '提交信息示例' --no-verify
```

### 😑 Typescript 支持

全局的类型说明都定义在 `src/types` 目录下，比如 env、router 的类型等；

### 🙄 常用插件

引入了一些常用的插件，如 [pinia](https://pinia.vuejs.org/zh/)、[vueUse](https://vueuse.org/)、nprogress、[es-toolkit（替代 lodash）](https://github.com/toss/es-toolkit) 等；

### 😴 接口请求

对接口请求进行了简单封装，由 [alovajs](https://alova.js.org/zh-CN/) 支持，采用 hooks 的形式进行接口请求；

### 😵 路由管理

支持根据文件自动引入路由，无需手动再定义路由文件，还可以自定义拓展路由属性（**由每个路由页面单独管理**），由 [unplugin-vue-router](https://github.com/posva/unplugin-vue-router) 插件支持；

### 🥴 菜单管理 & 封装
1. 简单封装了 路由转菜单、远程菜单匹配路由、路由和标签、路由鉴权 的逻辑，**可在 env 中选择关闭**；
2. 只需要关注菜单相关的逻辑以及每个路由页面的配置项即可，无需关注路由的生成；

### 😶 组件开发

1. 支持 项目组件 / 第三方组件 的 **按需引入、自动引入**，需要自行添加对应的 UI 组件库的配置代码；
2. 支持 jsx / tsx 编写 vue 组件；
3. 简单实现了 `SvgIcon` 图标组件，支持自动引入本地项目中的 svg 图标；同时还支持引入 [iconify](https://iconify.design/docs/) 和 [IconPark](https://iconpark.oceanengine.com/official) 的图标；

### 😣 主题切换

利用 [UnoCSS](https://unocss.dev/) + SCSS 简单实现了实现主题切换的逻辑；

---



## 参考学习资料 🔗

- [vue 官方文档 - 框架介绍](https://cn.vuejs.org/)

---
