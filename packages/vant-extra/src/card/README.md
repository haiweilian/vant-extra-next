---
permalink: /components/card
---

# Card

将信息聚合在卡片容器中展示。

## 基础用法

显示标题和描述。

<demo src="./__demos__/basic.vue"></demo>

## 显示图片

显示顶部的封面图。

<demo src="./__demos__/image.vue"></demo>

## 使用插槽

自定义额外的内容。

<demo src="./__demos__/slot.vue"></demo>

## 组件配置

### Card Props

| 属性   | 说明         | 类型            | 默认值 |
| ------ | ------------ | --------------- | ------ |
| title  | 卡片标题     | string          | -      |
| desc   | 卡片描述     | string          | -      |
| shadow | 是否显示阴影 | boolean         | false  |
| src    | 图片地址     | string          | -      |
| fit    | 图片填充模式 | string          | -      |
| height | 图片高度     | number / string | -      |

### Card Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| title   | 自定义标题     |
| desc    | 自定义描述     |
| image   | 自定义图片     |
| default | 自定义主内容   |

## 类型定义

组件导出以下类型定义。

```ts
import type { CardProps } from 'vant-extra-next'
```

## 样式变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                       | 默认值                                                |
| -------------------------- | ----------------------------------------------------- |
| --vae-card-padding         | 0 0 var(--van-padding-md) 0                           |
| --vae-card-line-height     | var(--van-line-height-lg)                             |
| --vae-card-background      | var(--van-background-2)                               |
| --vae-card-border          | var(--van-border-width) solid var(--van-border-color) |
| --vae-card-radius          | var(--van-radius-lg)                                  |
| --vae-card-shadow          | 0 0 4px rgb(0 0 0 / 12%)                              |
| --vae-card-image-width     | 100%                                                  |
| --vae-card-image-height    | 200px                                                 |
| --vae-card-title-padding   | 0 var(--van-padding-sm)                               |
| --vae-card-title-margin    | var(--van-padding-md) 0 0 0                           |
| --vae-card-title-font-size | var(--van-font-size-lg)                               |
| --vae-card-title-color     | var(--van-text-color)                                 |
| --vae-card-desc-padding    | 0 var(--van-padding-sm)                               |
| --vae-card-desc-margin     | var(--van-padding-sm) 0 0 0                           |
| --vae-card-desc-font-size  | var(--van-font-size-md)                               |
| --vae-card-desc-color      | var(--van-text-color-2)                               |
| --vae-card-body-padding    | 0 var(--van-padding-sm)                               |
| --vae-card-body-margin     | var(--van-padding-sm) 0 0 0                           |
