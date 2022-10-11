---
permalink: /components/form
---

# Form

基于表单类组件二次封装表单组件便于操作。

## 原始表单

原始表单组件通过包装一层 `Field` 组件实现不做功能更改。

<demo src="./__demos__/basic.vue"></demo>

## 选择框表单

单选和多选实现 `options` 选项便于数据渲染。

<demo src="./__demos__/checker.vue"></demo>

## 选择器表单

结合 `Field`、`Popup` 和 `Picker` 组件的组合实现绑定与回显。添加 `Select` 组件实现下拉选择。

<demo src="./__demos__/picker.vue"></demo>

## 时间表单

结合 `Field`、`Popup` 和 `DatePicker/TimePicker` 组件统一化渲染的时间格式。添加 `DateTimePicker` 组件实现日期时间选择。

<demo src="./__demos__/datetime.vue"></demo>

## 表单操作(Ref)

通过 Ref 控制表单，获取到组件的实例进行操作。

<demo src="./__demos__/actions.vue"></demo>

## 表单操作(Use)

通过 Hooks 控制表单，使用 `register` 事件关联实例进行操作。

<demo src="./__demos__/actions-use.vue"></demo>

## 表单配置(Schema)

演示一些常用的表单配置项。

<demo src="./__demos__/schema.vue"></demo>

## 组件配置

基于 [Vant Form Props](https://vant-contrib.gitee.io/vant/v4/#/zh-CN/form#props) 扩展，原有参数保留。

### Form Props

| 属性    | 说明       | 类型         | 默认值 |
| ------- | ---------- | ------------ | ------ |
| schemas | 表单项配置 | FormSchema[] | []     |

### Form Events

| 事件名 | 说明                       | 参数                                              |
| ------ | -------------------------- | ------------------------------------------------- |
| submit | 提交表单且验证通过后触发   | `values: object`                                  |
| failed | 提交表单且验证不通过后触发 | `errorInfo: { values: object, errors: object[] }` |

### Form Slots

| 插槽名  | 说明         |
| ------- | ------------ |
| default | 追加表单内容 |

## 类型定义

组件导出以下类型定义

```ts
import type {
  FormProps,
  FormSchema,
  FormAction,
  FormInstance,
  FormComponentType,
} from '@bfelib/vant-extra'
```
