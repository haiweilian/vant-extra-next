import type { SidebarConfig } from 'vuepress'

export const zh: SidebarConfig = {
  '/components': [
    {
      text: '表单组件',
      children: [
        {
          text: 'Form 表单',
          link: '/components/form/',
        },
      ],
    },
    {
      text: '扩展组件',
      children: [
        {
          text: 'BackTop 回到顶部',
          link: '/components/backtop/',
        },
        {
          text: 'Card 卡片',
          link: '/components/card/',
        },
        {
          text: 'Image 图片',
          link: '/components/image/',
        },
        {
          text: 'Descriptions 描述列表',
          link: '/components/descriptions/',
        },
      ],
    },
  ],
}
