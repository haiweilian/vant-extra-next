import { pick, assign } from 'lodash-es'
import type { PopupProps, FieldProps } from 'vant'
import type { FormSchema } from './types'

export const getFieldProps = (schema: FormSchema): Partial<FieldProps> => {
  return assign(
    {},

    pick(schema, [
      'label',
      'name',
      'size',
      'placeholder',
      'disabled',
      'readonly',
      'colon',
      'required',
      'isLink',
      'arrowDirection',
      'labelWidth',
      'labelClass',
      'labelAlign',
      'rules',
    ]),

    schema.fieldProps || {}
  )
}

export const getPopupProps = (schema: FormSchema): Partial<PopupProps> => {
  return schema.popupProps || {}
}

export const getComponentProps = <T>(schema: FormSchema): Partial<T> => {
  return (schema.componentProps || {}) as T
}
