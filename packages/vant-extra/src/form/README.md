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

| 属性    | 说明         | 类型         | 默认值 |
| ------- | ------------ | ------------ | ------ |
| v-model | 双向绑定的值 | Object       | {}     |
| schemas | 表单项配置   | FormSchema[] | []     |

```ts
export interface FormSchema {
  /**
   * 输入框左侧文本
   */
  label: Numeric
  /**
   * 名称，作为提交表单时的标识符
   */
  name: string
  /**
   * 组件类型
   */
  component: FormComponentType
  /**
   * 输入框占位提示文字
   */
  placeholder?: string
  /**
   * 是否禁用输入框
   */
  disabled?: boolean
  /**
   * 是否在 label 后面添加冒号
   */
  colon?: boolean
  /**
   * 是否显示表单必填星号
   */
  required?: boolean
  /**
   * 是否展示右侧箭头并开启点击反馈
   */
  isLink?: boolean
  /**
   * 箭头方向
   */
  arrowDirection?: CellArrowDirection
  /**
   * 左侧文本宽度
   */
  labelWidth?: Numeric
  /**
   * 左侧文本额外类名
   */
  labelClass?: unknown
  /**
   * 左侧文本对齐方式
   */
  labelAlign?: FieldTextAlign
  /**
   * 表单校验规则，详见 Form 组件	FieldRule[]
   */
  rules?: FieldRule[]
  /**
   * 项属性配置
   */
  fieldProps?: Partial<FieldProps>
  /**
   * 弹出层属性配置
   */
  popupProps?: Partial<PopoverProps>
  /**
   * 组件属性配置
   */
  componentProps?: Recordable
  /**
   * 是否隐藏，相当于删除
   */
  hidden?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean)
  /**
   * 自定义插槽
   */
  slot?: string
  /**
   * 自定义渲染
   */
  render?: (
    renderCallbackParams: RenderCallbackParams
  ) => VNode | VNode[] | string
}
```

### Form Events

| 事件名 | 说明                       | 参数                                              |
| ------ | -------------------------- | ------------------------------------------------- |
| submit | 提交表单且验证通过后触发   | `values: object`                                  |
| failed | 提交表单且验证不通过后触发 | `errorInfo: { values: object, errors: object[] }` |

### Form Slots

| 插槽名  | 说明         |
| ------- | ------------ |
| default | 追加表单内容 |

### Form Methods

通过 `ref/register` 可以获取到 Form 实例并调用实例方法。

```ts
export interface FormAction {
  /**
   * 提交表单，与点击提交按钮的效果等价
   */
  submit: () => void
  /**
   * 滚动到对应表单项的位置，默认滚动到顶部，第二个参数传 false 可滚动至底部
   */
  scrollToField: (name: string, options?: boolean) => void
  /**
   * 获取所有表单项当前的值
   */
  getValues: () => Recordable
  /**
   * 设置所有表单项当前的值
   */
  setValues: (values: Recordable) => void
  /**
   * 重置所有表单项当前的值
   */
  resetValues: () => void
  /**
   * 验证表单，支持传入一个或多个 name 来验证单个或部分表单项，不传入 name 时，会验证所有表单项
   */
  validate: (name?: string | string[]) => Promise<Recordable>
  /**
   * 重置表单项的验证提示，支持传入一个或多个 name 来重置单个或部分表单项，不传入 name 时，会重置所有表单项
   */
  resetValidation: (name?: string | string[]) => void
  /**
   * 获取所有表单项的校验状态，状态包括 passed、failed、unvalidated
   */
  getValidationStatus: () => Recordable<FieldValidationStatus>
  /**
   * 动态设置表单 Props
   */
  setProps: (props: Partial<FormProps>) => void
  /**
   * 获取 Schema，经过内部处理后的
   */
  getSchema: () => FormSchema[]
  /**
   * 重置 Schema，完全覆盖上次的值
   */
  resetSchema: (schemas: Partial<FormSchema> | Partial<FormSchema>[]) => void
  /**
   * 更新 Schema，支持一个或多个，通过 name 对比深度合并
   */
  updateSchema: (schemas: Partial<FormSchema> | Partial<FormSchema>[]) => void
  /**
   * 删除 Schema，根据 name 删除支持一个或多个
   */
  removeSchemaByName: (names: string | string[]) => void
}
```

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
