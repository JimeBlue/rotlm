import antfu from '@antfu/eslint-config'
// import withNuxt from './.nuxt/eslint.config.mjs'

export default antfu(
  {
    rules: {
      curly: ['error', 'multi-line'],
    },
    stylistic: {
      indent: 2,
      quotes: 'single',
    },
    vue: {
      overrides: {
        'vue/operator-linebreak': ['error', 'before'],
        'vue/block-order': ['error', { order: ['template', 'script', 'style'] }],
        'vue/max-attributes-per-line': ['error', { singleline: 3, multiline: 1 }],
      },
    },
    // javascript: {
    //   overrides: {
    //     curly: ['error', 'multi-line'],
    //   },
    // },
    formatters: {
      css: true,
      html: true,
      markdown: 'prettier',
    },
  },
  {
    rules: {
      'no-undef': 'off',
    },
  },
)
