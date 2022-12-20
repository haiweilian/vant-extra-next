import { makeStringProp, numericProp } from 'vant/es/utils'
import type { ExtractPropTypes, PropType } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

export type LinkType = 'default' | 'primary' | 'success' | 'warning' | 'danger'

export type LinkUnderline = 'always' | 'hover' | 'none'

export const linkProps = {
  /**
   * 链接类型
   */
  type: makeStringProp<LinkType>('default'),
  /**
   * 下划线状态
   */
  underline: makeStringProp<LinkUnderline>('always'),
  /**
   * 是否禁用
   */
  disabled: Boolean,
  /**
   * 文字尺寸
   */
  textSize: numericProp,
  /**
   * 文字颜色
   */
  textColor: String,
  /**
   * 原生 href 属性
   */
  href: String,
  /**
   * 原生 target 属性
   */
  target: String,
  /**
   * router-link to 属性
   */
  to: [String, Object] as PropType<RouteLocationRaw>,
  /**
   * router-link replace 属性
   */
  replace: Boolean,
}

export type LinkProps = ExtractPropTypes<typeof linkProps>
