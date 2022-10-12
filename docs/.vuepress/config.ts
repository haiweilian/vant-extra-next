import { defineUserConfig, defaultTheme, viteBundler } from 'vuepress'
import { codeBlockPlugin } from '@bfelib/vuepress-plugins'
import vueDefineOptions from 'unplugin-vue-define-options/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { generatePaths } from '@bfelib/vant-extra/scripts/build/utils/rollup'
import * as navbar from './configs/navbar'
import * as sidebar from './configs/sidebar'

export default defineUserConfig({
  base: '/vant-extra/',

  pagePatterns: [
    '**/*.md',
    '!.vuepress',
    '!node_modules',
    '../packages/vant-extra/src/**/*.md',
    '!../packages/**/node_modules',
  ],

  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'vant-extra',
      description: '基于 Vant 4.x 二次开发的业务组件',
    },
  },

  bundler: viteBundler({
    viteOptions: {
      plugins: [
        // @ts-ignore
        vueDefineOptions(),
        // @ts-ignore
        vueJsx(),
      ],
      build: {
        rollupOptions: {
          output: {
            paths: generatePaths(),
          },
        },
      },
    },
    vuePluginOptions: {},
  }),

  theme: defaultTheme({
    logo: 'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png',

    repo: 'https://github.com/bfelib/vant-extra',

    locales: {
      '/': {
        navbar: navbar.zh,
        sidebar: sidebar.zh,
        sidebarDepth: 1,
        selectLanguageName: '简体中文',
        selectLanguageText: '选择语言',
        selectLanguageAriaLabel: '选择语言',
      },
    },

    themePlugins: {
      mediumZoom: false,
    },
  }),

  plugins: [
    // @bfelib/vuepress-plugins
    codeBlockPlugin(),
  ],
})
