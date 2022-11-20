---
permalink: /components/descriptions
---

# Descriptions

列表形式展示多个字段。

## 基础用法

简单的展示。

<demo src="./__demos__/basic.vue"></demo>

## 使用插槽

自定义尺寸、内容，适应在各种容器中展示。

<demo src="./__demos__/slots.vue"></demo>

## 组件配置

### Descriptions Props

| 属性   | 说明                     | 类型               | 默认值 |
| ------ | ------------------------ | ------------------ | ------ |
| column | 一行的数量               | number             | 2      |
| colon  | 是否添加冒号             | boolean            | true   |
| title  | 标题文本，显示在左上方   | string             | -      |
| extra  | 操作区文本，显示在右上方 | string             | -      |
| size   | 描述列表尺寸             | 'normal' / 'small' | normal |

### Descriptions Slots

| 插槽名  | 说明                       |
| ------- | -------------------------- |
| default | DescriptionsItem           |
| title   | 自定义标题，显示在左上方   |
| extra   | 自定义操作区，显示在右上方 |

### DescriptionsItem Props

| 属性  | 说明     | 类型   | 默认值 |
| ----- | -------- | ------ | ------ |
| label | 标签文本 | string | -      |
| span  | 列的数量 | number | 1      |

### DescriptionsItem Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 自定义默认内容 |
| label   | 自定义标签     |

## 类型定义

组件导出以下类型定义。

```ts
import type {
  DescriptionsProps,
  DescriptionsItemProps,
} from '@bfelib/vant-extra'
```

## 样式变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                                     | 默认值                        |
| ---------------------------------------- | ----------------------------- |
| --vae-descriptions-font-size             | var(--van-font-size-md)       |
| --vae-descriptions-color                 | var(--van-text-color)         |
| --vae-descriptions-colon-margin          | 0 var(--van-padding-xs) 0 2px |
| --vae-descriptions-header-margin         | 0 0 var(--van-padding-md) 0   |
| --vae-descriptions-title-font-size       | var(--van-font-size-lg)       |
| --vae-descriptions-title-color           | var(--van-text-color)         |
| --vae-descriptions-body-background       | var(--van-background-2)       |
| --vae-descriptions-cell-font-size        | var(--van-font-size-md)       |
| --vae-descriptions-cell-padding          | 0 0 var(--van-padding-sm) 0   |
| --vae-descriptions-label-color           | var(--van-text-color-2)       |
| --vae-descriptions-content-color         | var(--van-text-color)         |
| --vae-descriptions-small-header-margin   | 0 0 var(--van-padding-sm) 0   |
| --vae-descriptions-small-title-font-size | var(--van-font-size-md)       |
| --vae-descriptions-small-cell-font-size  | var(--van-font-size-sm)       |
| --vae-descriptions-small-cell-padding    | 0 0 var(--van-padding-xs) 0   |
