import { numericProp } from 'vant/es/utils'
import type { ImageFit } from 'vant'
import type { ExtractPropTypes, PropType } from 'vue'

export const cardProps = {
  /**
   * 卡片标题
   */
  title: String,
  /**
   * 卡片描述
   */
  desc: String,
  /**
   * 是否显示阴影
   */
  shadow: Boolean,
  /**
   * 图片地址
   */
  src: String,
  /**
   * 图片填充模式
   */
  fit: String as PropType<ImageFit>,
  /**
   * 图片高度
   */
  height: numericProp,
}

export type CardProps = ExtractPropTypes<typeof cardProps>
