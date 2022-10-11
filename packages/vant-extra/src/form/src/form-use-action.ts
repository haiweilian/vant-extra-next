import { nextTick } from 'vue'
import { merge } from 'lodash-es'
import type { Ref, ComputedRef } from 'vue'
import type { FormInstance as VantFormInstance } from 'vant'
import type { Recordable } from '../../utils'
import type { FormProps, FormSchema, FormAction } from './types'

interface FormActionContext {
  formModel: Recordable
  formElRef: Ref<VantFormInstance>
  propsRef: Ref<FormProps>
  propsComputed: ComputedRef<FormProps>
  schemaRef: Ref<FormSchema[]>
  schemaComputed: ComputedRef<FormSchema[]>
}

export function useFormAction({
  formModel,
  formElRef,
  propsRef,
  schemaRef,
  schemaComputed,
}: FormActionContext): FormAction {
  function submit() {
    formElRef.value.submit()
  }

  function scrollToField(name: string, options?: boolean) {
    formElRef.value.scrollToField(name, options)
  }

  function getValues() {
    return formElRef.value.getValues()
  }

  function setValues(values: Recordable) {
    Object.keys(values).forEach((key) => {
      formModel[key] = values[key]
    })
  }

  function resetValues() {
    Object.keys(formModel).forEach((key) => {
      const schema = schemaComputed.value.find((item) => item.name === key)
      schema && delete formModel[key]
    })
    nextTick(() => resetValidation())
  }

  async function validate(name?: string | string[]) {
    await formElRef.value.validate(name)
    return getValues()
  }

  function resetValidation(name?: string | string[]) {
    formElRef.value.resetValidation(name)
  }

  function getValidationStatus() {
    return formElRef.value.getValidationStatus()
  }

  function setProps(props: Partial<FormProps>) {
    propsRef.value = merge(propsRef.value, props)
  }

  function getSchema() {
    return schemaComputed.value
  }

  function resetSchema(schemas: Partial<FormSchema> | Partial<FormSchema>[]) {
    const newSchemas = Array.isArray(schemas) ? schemas : [schemas]

    schemaRef.value = newSchemas as FormSchema[]
  }

  function updateSchema(schemas: Partial<FormSchema> | Partial<FormSchema>[]) {
    const updateSchemas = Array.isArray(schemas) ? schemas : [schemas]

    const newSchemas: FormSchema[] = []
    updateSchemas.forEach((item) => {
      schemaComputed.value.forEach((val) => {
        if (val.name === item.name) {
          newSchemas.push(merge(val, item))
        } else {
          newSchemas.push(val)
        }
      })
    })

    schemaRef.value = newSchemas
  }

  function removeSchemaByName(names: string | string[]) {
    const removeNames = Array.isArray(names) ? names : [names]

    const newSchemas = schemaComputed.value.filter(
      (schema) => !removeNames.includes(schema.name)
    )

    schemaRef.value = newSchemas
  }

  return {
    submit,
    scrollToField,
    getValues,
    setValues,
    resetValues,
    validate,
    resetValidation,
    getValidationStatus,
    setProps,
    getSchema,
    resetSchema,
    updateSchema,
    removeSchemaByName,
  }
}
