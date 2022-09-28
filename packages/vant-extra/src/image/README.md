---
permalink: /components/image
---

# Image

基于 `Image`、`ImagePreview` 组件封装，增加以预览和分组。

## 基础用法

默认开启点击图片时预览图片。

<demo iframe="200" src="./__demos__/basic.vue"></demo>

## 分组预览

预览一组图片。

<demo iframe="200" src="./__demos__/group.vue"></demo>

## 组件配置

支持 [Image](https://vant-contrib.gitee.io/vant/v4/#/zh-CN/image#api) 的所有配置，以下是额外的配置。

### Image Props

| 属性            | 说明                                              | 类型    | 默认值 |
| --------------- | ------------------------------------------------- | ------- | ------ |
| thumbnail       | 图片缩略图，默认展示缩略图放大后展示原图          | string  | -      |
| preview-image   | 是否点击展示展示预览图                            | boolean | true   |
| preview-options | 全屏图片预览的配置项，可选值见 `showImagePreview` | object  | -      |

### ImageGroup Props

| 属性            | 说明                                              | 类型    | 默认值 |
| --------------- | ------------------------------------------------- | ------- | ------ |
| preview-image   | 是否点击展示展示预览图                            | boolean | true   |
| preview-options | 全屏图片预览的配置项，可选值见 `showImagePreview` | object  | -      |

## 类型定义

组件导出以下类型定义

```ts
import type { ImageProps } from '@bfelib/vant-extra'
```
