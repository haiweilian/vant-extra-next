import { extend } from 'vant/es/utils'
import { formProps as vantFormProps } from 'vant'
import type { PropType } from 'vue'
import type { FormSchema } from './types'
import type { Recordable } from '../../utils'

export const formProps = extend({}, vantFormProps, {
  schemas: {
    type: Array as PropType<FormSchema[]>,
    default: () => [],
  },
  modelValue: {
    type: Object as PropType<Recordable>,
    default: () => ({}),
  },
})
