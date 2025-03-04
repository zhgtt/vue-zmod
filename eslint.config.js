import antfu from '@antfu/eslint-config'

export default antfu(
  // 设置项，指定启用哪些插件和 ignores
  {
    // 开启 vue、typescript 的检查（可以不配置，因为默认是支持并开启的）
    vue: true,
    typescript: true,

    // 开启 unocss 的检查，需要安装 @unocss/eslint-plugin 插件
    unocss: true,

    // 指定哪些文件不需要 eslint 检查
    ignores: ['public', 'dist*', '*.md', 'package.json'],

    // 开启对 html、css、markdown 的格式化，需要安装 eslint-plugin-format 插件
    formatters: {
      css: true, // 默认使用 prettier
      html: true, // 默认使用 prettier
      markdown: 'prettier', // 还可以选择使用 dprint 格式化工具
    },
  },

  // 设置全局的规则
  {
    rules: {
      // 强制末尾加分号（可以自行打开，默认是没有分号的）
      // 'style/semi': ['error', 'always'],

      /**
       * @description: 指定一行代码的最大长度
       * @key code - 表示一行代码的长度，默认为 80，超过这个长度，会报错，可以自行调整
       * @key ignoreComments - 表示是否忽略注释，默认为 false
       *
       * 🆎 更多参数查看文档 https://eslint.org/docs/latest/rules/max-len
       *
       * 🆎 @antfu 官方不限制长度，且不支持自动格式化折行，只能自己手动折行
       */
      'max-len': ['error', { code: 120, ignoreComments: true }],

      /**
       * @description: 统一排序 import，默认是按字母排序，可以自行配置排序规则
       *
       * 🆎 更多参数查看文档 https://perfectionist.dev/rules/sort-imports
       */
      'perfectionist/sort-imports': ['off', {}],

      // 单行 if 语句是否需要换行；默认是 error，强制换行
      // 'antfu/if-newline': 'off',

      // 是否删除不使用的 import；默认是 error（强制删除）
      'unused-imports/no-unused-imports': 'off',
    },
  },

  // 设置指定文件的规则，这里指定 vue 文件
  {
    files: ['src/**/*.vue'],
    rules: {
      'vue/valid-template-root': 'warn', // 是否允许模板内容为空，默认是 error
    },
  },
)
