import type { SidebarConfig } from 'vuepress'

export const zh: SidebarConfig = {
  '/components': [
    {
      text: '基础组件',
      children: [
        {
          text: 'BackTop 回到顶部',
          link: '/components/backtop/',
        },
        {
          text: 'Image 图片',
          link: '/components/image/',
        },
      ],
    },
  ],
}
