import { defineComponent, reactive, ref, computed, onMounted } from 'vue'
import type { Ref } from 'vue'
import { Form, Field, type FormInstance as VantFormInstance } from 'vant'
import { isString, isFunction } from 'lodash-es'
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
      let schemas = schemaRef.value.length
        ? schemaRef.value
        : propsComputed.value.schemas || []

      schemas = schemas.filter((schema) => {
        let hidden = schema.hidden
        if (isFunction(schema.hidden)) {
          hidden = schema.hidden({
            name: schema.name,
            model: formModel,
            schema,
          })
        }
        return !hidden
      })

      return schemas
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

      if (isString(schema.slot)) {
        return slots[schema.slot]?.({
          name: schema.name,
          model: formModel,
          schema,
        })
      }

      if (isFunction(schema.render)) {
        return schema.render({
          name: schema.name,
          model: formModel,
          schema,
        })
      }

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
