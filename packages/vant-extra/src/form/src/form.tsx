import { defineComponent, reactive, ref, computed, onMounted } from 'vue'
import type { Ref } from 'vue'
import { Form, Field, type FormInstance as VantFormInstance } from 'vant'
import { useExpose } from 'vant/es/composables/use-expose'
import { createNamespace } from '../../utils'
import { formComponentMap } from './form-component'
import { getFieldProps, getComponentProps } from './utils'
import { useFormAction } from './form-use-action'
import { formProps } from './props'
import type { FormProps, FormSchema, FormAction } from './types'

const [name] = createNamespace('form')

export default defineComponent({
  name,

  props: formProps,

  emits: ['register'],

  setup(props, { emit, slots }) {
    const formModel = reactive<any>({})
    const formElRef = ref<VantFormInstance>()

    const propsRef = ref<FormProps>({})
    const propsComputed = computed<FormProps>(() => {
      return { ...props, ...propsRef.value }
    })

    const schemaRef = ref<FormSchema[]>([])
    const schemaComputed = computed<FormSchema[]>(() => {
      return schemaRef.value.length
        ? schemaRef.value
        : propsComputed.value.schemas || []
    })

    const actions = useFormAction({
      formModel,
      formElRef: formElRef as Ref<VantFormInstance>,
      propsRef,
      propsComputed,
      schemaRef,
      schemaComputed,
    })

    useExpose<FormAction>({
      ...actions,
    })

    onMounted(() => {
      emit('register', actions)
    })

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
      <Form ref={formElRef} {...propsComputed.value}>
        {schemaComputed.value.map((schema) => getFormItem(schema))}
        {slots.default?.()}
      </Form>
    )
  },
})
