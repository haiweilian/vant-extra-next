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
| extra   | 自定义底部内容 |
| default | 自定义主内容   |

## 类型定义

组件导出以下类型定义

```ts
import type { CardProps } from '@bfelib/vant-extra'
```

## 样式变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                       | 默认值                   |
| -------------------------- | ------------------------ |
| --vae-card-padding         | 0 0 16px 0               |
| --vae-card-line-height     | 22px                     |
| --vae-card-background      | #fff                     |
| --vae-card-border          | 1px solid #ebedf0        |
| --vae-card-radius          | 8px                      |
| --vae-card-shadow          | 0 0 4px rgb(0 0 0 / 12%) |
| --vae-card-image-width     | 100%                     |
| --vae-card-image-height    | 200px                    |
| --vae-card-title-padding   | 0 12px                   |
| --vae-card-title-margin    | 16px 0 0 0               |
| --vae-card-title-font-size | 16px                     |
| --vae-card-title-color     | #323233                  |
| --vae-card-desc-padding    | 0 12px                   |
| --vae-card-desc-margin     | 16px 0 0 0               |
| --vae-card-desc-font-size  | 14px                     |
| --vae-card-desc-color      | #969799                  |
| --vae-card-extra-padding   | 0 12px                   |
| --vae-card-extra-margin    | 24px 0 0 0               |
