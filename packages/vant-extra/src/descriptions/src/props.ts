import { makeNumberProp, makeStringProp, truthProp } from 'vant/es/utils'
import type { ExtractPropTypes } from 'vue'

export type DescriptionsSize = 'normal' | 'small'

export const descriptionsProps = {
  /**
   * 一行的数量
   */
  column: makeNumberProp(2),
  /**
   * 是否添加冒号
   */
  colon: truthProp,
  /**
   * 标题文本，显示在左上方
   */
  title: String,
  /**
   * 操作区文本，显示在右上方
   */
  extra: String,
  /**
   * 描述列表尺寸
   */
  size: makeStringProp<DescriptionsSize>('normal'),
}

export type DescriptionsProps = ExtractPropTypes<typeof descriptionsProps>

export const descriptionsItemProps = {
  /**
   * 标签文本
   */
  label: String,
  /**
   * 列的数量
   */
  span: Number,
}

export type DescriptionsItemProps = ExtractPropTypes<
  typeof descriptionsItemProps
>
