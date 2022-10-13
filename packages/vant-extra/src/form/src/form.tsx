import { defineComponent, reactive, ref, watch, computed, onMounted } from 'vue'
import type { Ref } from 'vue'
import { Form, Field, type FormInstance as VantFormInstance } from 'vant'
import { isSameValue } from 'vant/es/utils'
import { isString, isArray, isFunction, cloneDeep, omit } from 'lodash-es'
import { useExpose } from 'vant/es/composables/use-expose'
import { createNamespace, type Recordable } from '../../utils'
import { formComponentMap } from './form-component'
import { getFieldProps, getComponentProps } from './utils'
import { useFormAction } from './form-use-action'
import { formProps } from './props'
import type { FormProps, FormSchema, FormAction } from './types'

const [name] = createNamespace('form')

export default defineComponent({
  name,

  props: formProps,

  emits: ['register', 'update:modelValue'],

  setup(props, { emit, slots }) {
    const formModel = reactive<Recordable>(props.modelValue)
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

      schemas = cloneDeep(schemas)
      schemas.forEach((schema) => {
        // 合并 Field Props 在自定义渲染时便于获取
        schema.fieldProps = getFieldProps(schema)

        // 如果 Field Placeholder 不存在生成提示信息
        if (!schema.placeholder) {
          schema.placeholder = `${
            schema.component === 'Field' ? '请输入' : `请选择`
          }${schema.label}`
        }

        // 若设置了 required 属性，又没有其他的 rules，就创建一个验证规则
        // 若设置了 required 属性，又存在其他的 rules，则只 rules 中不存在 required 属性时，才添加验证 required 的规则
        if (schema.required) {
          if (isArray(schema.rules)) {
            const hasRequiredRule = schema.rules.some((rule) => rule.required)
            if (!hasRequiredRule) {
              schema.rules.unshift({
                required: true,
                message: schema.placeholder,
              })
            }
          } else {
            schema.rules = [{ required: true, message: schema.placeholder }]
          }
        }
      })

      // 过滤需要隐藏的表单项
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

    watch(
      () => props.modelValue,
      (newValue) => {
        if (!isSameValue(newValue, formModel)) {
          actions.setValues(newValue)
        }
      }
    )

    watch(formModel, (newValue) => {
      if (!isSameValue(newValue, props.modelValue)) {
        emit('update:modelValue', newValue)
      }
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
      <Form
        ref={formElRef}
        {...omit(propsComputed.value, ['schemas', 'modelValue'])}
      >
        {schemaComputed.value.map((schema) => getFormItem(schema))}
        {slots.default?.()}
      </Form>
    )
  },
})
