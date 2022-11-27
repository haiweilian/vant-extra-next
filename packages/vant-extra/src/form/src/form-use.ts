import { onUnmounted, ref, watch } from 'vue'
import {
  getDynamicProps,
  type Recordable,
  type DynamicProps,
} from '../../utils'
import type {
  FormProps,
  FormSchema,
  FormAction,
  UseFormReturnType,
} from './types'

export function useForm(props?: DynamicProps<FormProps>): UseFormReturnType {
  const formRef = ref<FormAction | null>()

  function getForm() {
    const form = formRef.value
    if (!form) {
      throw new Error(
        'The form instance has not been obtained, please make sure that the form has been rendered when performing the form operation!'
      )
    }
    return form as FormAction
  }

  function register(instance: FormAction) {
    onUnmounted(() => {
      formRef.value = null
    })

    formRef.value = instance

    watch(
      () => props,
      () => {
        props && instance.setProps(getDynamicProps(props))
      },
      {
        deep: true,
        immediate: true,
      }
    )
  }

  const actions: FormAction = {
    submit() {
      return getForm().submit()
    },

    scrollToField(name: string, options?: boolean) {
      return getForm().scrollToField(name, options)
    },

    getValues() {
      return getForm().getValues()
    },

    setValues(values: Recordable) {
      return getForm().setValues(values)
    },

    resetValues(values?: Recordable) {
      return getForm().resetValues(values)
    },

    async validate(name?: string | string[]) {
      return getForm().validate(name)
    },

    resetValidation(name?: string | string[]) {
      return getForm().resetValidation(name)
    },

    getValidationStatus() {
      return getForm().getValidationStatus()
    },

    setProps(props: Partial<FormProps>) {
      return getForm().setProps(props)
    },

    getSchema() {
      return getForm().getSchema()
    },

    resetSchema(schemas: Partial<FormSchema> | Partial<FormSchema>[]) {
      return getForm().resetSchema(schemas)
    },

    updateSchema(schemas: Partial<FormSchema> | Partial<FormSchema>[]) {
      return getForm().updateSchema(schemas)
    },

    removeSchemaByName(names: string | string[]) {
      return getForm().removeSchemaByName(names)
    },
  }

  return [register, actions]
}
