---
permalink: /components/link
---

# Link

链接组件，用于页面跳转。

## 基础用法

所有链接的用法。

<demo src="./__demos__/basic.vue"></demo>

## 组件配置

### Link Props

| 属性       | 说明                                                                   | 类型            | 默认值  |
| ---------- | ---------------------------------------------------------------------- | --------------- | ------- |
| type       | 类型，可选值为 `default` `primary` `info` `success` `warning` `danger` | string          | default |
| underline  | 下划线状态，可选值为 `always` `hover` `none`                           | string          | always  |
| disabled   | 是否禁用                                                               | boolean         | false   |
| text-color | 文字颜色                                                               | string          | -       |
| text-size  | 文字尺寸                                                               | string / number | -       |
| href       | 原生 href 属性，优先级高于 to                                          | string          | -       |
| target     | 原生 target 属性                                                       | string          | -       |
| to         | router-link to 属性                                                    | string          | -       |
| replace    | router-link replace 属性                                               | string          | false   |

### Link Events

| 事件名 | 说明           | 参数                          |
| ------ | -------------- | ----------------------------- |
| click  | 点击触发的事件 | `(event: MouseEvent) => void` |

### Link Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 自定义默认内容 |

## 类型定义

组件导出以下类型定义。

```ts
import type { LinkProps } from '@bfelib/vant-extra'
```

## 样式变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                        | 默认值                      |
| --------------------------- | --------------------------- |
| --vae-link-primary-color    | var(--van-primary-color)    |
| --vae-link-success-color    | var(--van-success-color)    |
| --vae-link-warning-color    | var(--van-warning-color)    |
| --vae-link-danger-color     | var(--van-danger-color)     |
| --vae-link-disabled-opacity | var(--van-disabled-opacity) |
| --vae-link-font-size        | var(--van-font-size-md)     |
