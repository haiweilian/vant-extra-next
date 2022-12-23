import {
  extend,
  truthProp,
  makeArrayProp,
  makeStringProp,
  type Numeric,
} from 'vant/es/utils'
import { pickerToolbarProps } from 'vant/es/picker/PickerToolbar'
import type { ExtractPropTypes, PropType } from 'vue'
import type { PickerToolbarPosition } from 'vant'
import type { CheckerOption, CheckerFieldNames } from './types'

export const checkerProps = extend({}, pickerToolbarProps, {
  /**
   * 绑定的值
   */
  modelValue: makeArrayProp<Numeric>(),
  /**
   * 是否允许多选
   */
  multiple: Boolean,
  /**
   * 是否显示加载状态
   */
  loading: Boolean,
  /**
   * 是否显示顶部栏
   */
  showToolbar: truthProp,
  /**
   * 顶部栏位置
   */
  toolbarPosition: makeStringProp<PickerToolbarPosition>('top'),
  /**
   * 配置每一列显示的数据
   */
  columns: makeArrayProp<CheckerOption>(),
  /**
   * 自定义 columns 结构中的字段
   */
  columnsFieldNames: Object as PropType<CheckerFieldNames>,
})

export type CheckerProps = ExtractPropTypes<typeof checkerProps>
