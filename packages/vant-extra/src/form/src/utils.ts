import { pick, assign } from 'lodash-es'
import type { PopupProps, FieldProps } from 'vant'
import type { FormSchema } from './types'
import type { Recordable } from '../../utils'

export const getFieldProps = (schema: FormSchema): Partial<FieldProps> => {
  return assign(
    {},

    pick(schema, [
      'label',
      'name',
      'placeholder',
      'disabled',
      'required',
      'rules',
    ]),

    schema.fieldProps || {}
  )
}

export const getPopupProps = (schema: FormSchema): Partial<PopupProps> => {
  return schema.popupProps || {}
}

export const getComponentProps = <T = Recordable>(
  schema: FormSchema
): Partial<T> => {
  return (schema.componentProps || {}) as T
}
