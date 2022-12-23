---
permalink: /components/checker
---

# Checker

在一组列表项中选择一个或多个。

## 基础单选

单选选择。

<demo src="./__demos__/basic.vue"></demo>

## 基础多选

多选选择。

<demo src="./__demos__/multiple.vue"></demo>

## 自定义结构

自定义 columns 的结构。

<demo src="./__demos__/names.vue"></demo>

## 搭配弹出层使用

在实际场景中，Checker 通常作为用于辅助表单填写，可以搭配 Popup 和 Field 实现该效果。

<demo src="./__demos__/popup.vue"></demo>

## 组件配置

### Checker Props

| 属性                | 说明                        | 类型                | 默认值                           |
| ------------------- | --------------------------- | ------------------- | -------------------------------- |
| v-model             | 绑定的值                    | string[] / number[] | -                                |
| multiple            | 是否允许多选                | boolean             | false                            |
| loading             | 是否显示加载状态            | boolean             | false                            |
| columns             | 配置每一列显示的数据        | PickerOption[]      | []                               |
| columns-field-names | 自定义 columns 结构中的字段 | object              | { text: 'text', value: 'value' } |
| title               | 顶部栏标题                  | string              | -                                |
| cancel-button-text  | 取消按钮文字                | string              | 取消                             |
| confirm-button-text | 确认按钮文字                | string              | 确认                             |
| toolbar-position    | 顶部栏位置，可选值为 bottom | string              | top                              |
| show-toolbar        | 取消按钮文字                | string              | 取消                             |

### Checker Events

| 事件名  | 说明               | 参数                                  |
| ------- | ------------------ | ------------------------------------- |
| confirm | 点击完成按钮时触发 | `{ selectedValues, selectedOptions }` |
| cancel  | 点击取消按钮时触发 | `{ selectedValues, selectedOptions }` |
| change  | 选项改变时触发     | `{ selectedValues, selectedOptions }` |

### Checker Slots

| 插槽名         | 说明                   |
| -------------- | ---------------------- |
| toolbar        | 自定义整个顶部栏的内容 |
| title          | 自定义标题内容         |
| confirm        | 自定义确认按钮内容     |
| cancel         | 自定义取消按钮内容     |
| columns-top    | 自定义选项上方内容     |
| columns-bottom | 自定义选项下方内容     |

## 类型定义

组件导出以下类型定义。

```ts
import type {
  CheckerProps,
  CheckerOption,
  CheckerColumn,
  CheckerFieldNames,
  CheckerConfirmEventParams,
  CheckerCancelEventParams,
} from 'vant-extra-next'
```

## 样式变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                             | 默认值                   |
| -------------------------------- | ------------------------ |
| --vae-checker-background         | var(--van-background-2)  |
| --vae-checker-loading-icon-color | var(--van-primary-color) |
| --vae-checker-loading-mask-color | rgb(255 255 255 / 90%)   |
| --vae-checker-active-color       | var(--van-primary-color) |
| --vae-checker-disabled-color     | var(--van-gray-5)        |
