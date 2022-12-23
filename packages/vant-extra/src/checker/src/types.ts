import type { Numeric } from 'vant/es/utils'
import type { ComponentPublicInstance } from 'vue'
import type { CheckerProps } from './props'

export type CheckerFieldNames = {
  text?: string
  value?: string
}

export type CheckerOption = {
  text?: Numeric
  value?: Numeric
  disabled?: boolean
  // for custom filed names
  [key: PropertyKey]: any
}

export type CheckerColumn = CheckerOption[]

export type CheckerExpose = {
  confirm: () => void
  getSelectedOptions: () => Array<CheckerOption | undefined>
}

export type CheckerInstance = ComponentPublicInstance<
  CheckerProps,
  CheckerExpose
>

export type CheckerConfirmEventParams = {
  selectedValues: Numeric[]
  selectedOptions: Array<CheckerOption | undefined>
}

export type CheckerCancelEventParams = CheckerConfirmEventParams
