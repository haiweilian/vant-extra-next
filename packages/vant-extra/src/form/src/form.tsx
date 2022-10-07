import { defineComponent, reactive, ref } from 'vue'
import { Form, Field } from 'vant'
import { createNamespace } from '../../utils'
import { formProps } from './props'
import { formComponentMap } from './form-component'
import { getFieldProps, getComponentProps } from './utils'
import type { FormSchema } from './types'

const [name] = createNamespace('form')

export default defineComponent({
  name,

  props: formProps,

  setup(props, { slots }) {
    const formModel = reactive<any>({})
    const schemas = ref(props.schemas)

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

    return () => (
      <Form>
        {schemas.value.map((schema) => getFormItem(schema))}
        {slots.default?.()}
      </Form>
    )
  },
})
