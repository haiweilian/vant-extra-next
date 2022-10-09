import { defineComponent, reactive, ref, type Ref } from 'vue'
import { Form, Field, type FormInstance as VantFormInstance } from 'vant'
import { useExpose } from 'vant/es/composables/use-expose'
import { createNamespace } from '../../utils'
import { formProps } from './props'
import { formComponentMap } from './form-component'
import { getFieldProps, getComponentProps } from './utils'
import { useFormAction } from './form-use-action'
import type { FormSchema, FormAction } from './types'

const [name] = createNamespace('form')

export default defineComponent({
  name,

  props: formProps,

  setup(props, { slots }) {
    const formModel = reactive<any>({})

    const formElRef = ref<VantFormInstance>()
    const schemaRef = ref(props.schemas)

    const getFormItem = (schema: FormSchema) => {
      const FormItem = formComponentMap.get(schema.component)

      if (schema.component === 'Field') {
        return (
          // @ts-ignore
          <FormItem
            v-model={formModel[schema.name]}
            {...getFieldProps(schema)}
            {...getComponentProps(schema)}
          />
        )
      } else if (schema.component === 'Divider') {
        return (
          // @ts-ignore
          <FormItem {...getComponentProps(schema)}>{schema.label}</FormItem>
        )
      } else {
        return (
          <Field
            v-slots={{
              input: () => (
                // @ts-ignore
                <FormItem v-model={formModel[schema.name]} schema={schema} />
              ),
            }}
            {...getFieldProps(schema)}
          />
        )
      }
    }

    const actions = useFormAction({
      props,
      formModel,
      formElRef: formElRef as Ref<VantFormInstance>,
      schemaRef,
    })

    useExpose<FormAction>({
      ...actions,
    })

    return () => (
      <Form ref={formElRef}>
        {schemaRef.value.map((schema) => getFormItem(schema))}
        {slots.default?.()}
      </Form>
    )
  },
})
