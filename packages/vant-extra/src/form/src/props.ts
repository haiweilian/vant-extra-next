import { extend } from 'vant/es/utils'
import { formProps as vantFormProps } from 'vant'
import type { PropType } from 'vue'
import type { FormSchema } from './types'

export const formProps = extend({}, vantFormProps, {
  schemas: {
    type: [Array] as PropType<FormSchema[]>,
    default: () => [],
  },
})
