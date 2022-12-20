import type { ComponentPublicInstance, VNode } from 'vue'
import type {
  FieldRule,
  FieldProps,
  PopoverProps,
  FieldValidationStatus,
  FormProps as VantFormProps,
} from 'vant'
import type { Recordable } from '../../utils'

export type FormComponentType =
  // source components
  | 'Divider'
  | 'Field'
  | 'Checkbox'
  | 'Rate'
  | 'Slider'
  | 'Stepper'
  | 'Switch'
  | 'Uploader'
  // extends components
  | 'Picker'
  | 'PickerSingle'
  | 'RadioGroup'
  | 'CheckboxGroup'
  | 'Calendar'
  | 'DatePicker'
  | 'TimePicker'
  | 'DateTimePicker'

export interface RenderCallbackParams {
  name: string
  model: Recordable
  schema: FormSchema
}

export interface FormProps extends Partial<VantFormProps> {
  /**
   * 表单配置
   */
  schemas?: FormSchema[]
}

export interface FormSchema {
  /**
   * 输入框左侧文本
   */
  label: string
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
   * 是否显示表单必填星号
   */
  required?: boolean
  /**
   * 表单校验规则，详见 Form 组件	FieldRule[]
   */
  rules?: FieldRule[]
  /**
   * 表单项属性配置
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
   * 设置所有表单项当前的值，只覆盖传入的值
   */
  setValues: (values: Recordable) => void
  /**
   * 重置所有表单项当前的值，并设置新的表单值
   */
  resetValues: (values?: Recordable) => void
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
   * 更新 Schema，使用深度合并支持一个或多个
   */
  updateSchema: (schemas: Partial<FormSchema> | Partial<FormSchema>[]) => void
  /**
   * 删除 Schema，根据 name 删除支持一个或多个
   */
  removeSchemaByName: (names: string | string[]) => void
}

export type FormInstance = ComponentPublicInstance<FormProps, FormAction>

export type UseFormRegister = (instance: FormAction) => void

export type UseFormReturnType = [UseFormRegister, FormAction]
