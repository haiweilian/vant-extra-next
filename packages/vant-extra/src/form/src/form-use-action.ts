import type { Ref } from 'vue'
import type { FormInstance as VantFormInstance } from 'vant'
import type { Recordable } from '../../utils'
import type { FormProps } from './props'
import type { FormSchema, FormAction } from './types'

interface FormActionContext {
  props: FormProps
  formModel: Recordable
  formElRef: Ref<VantFormInstance>
  schemaRef: Ref<FormSchema[]>
}

export function useFormAction({
  props,
  formModel,
  formElRef,
  schemaRef,
}: FormActionContext): FormAction {
  console.log(props, formModel, formElRef, schemaRef)

  function submit() {
    return formElRef.value.submit()
  }

  function scrollToField(name: string, options?: boolean) {
    return formElRef.value.scrollToField(name, options)
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
    // todo
  }

  async function validate(name?: string | string[]) {
    return formElRef.value.validate(name)
  }

  function resetValidation(name?: string | string[]) {
    return formElRef.value.resetValidation(name)
  }

  function getValidationStatus() {
    return formElRef.value.getValidationStatus()
  }

  function setProps() {
    // todo
  }

  function getSchema() {
    // todo
  }

  function resetSchema() {
    // todo
  }

  function updateSchema() {
    // todo
  }

  function removeSchema() {
    // todo
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
    removeSchema,
  }
}
