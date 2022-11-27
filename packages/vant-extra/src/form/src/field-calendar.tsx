import { defineComponent, ref, watch, type PropType } from 'vue'
import { Calendar } from 'vant'
import { isArray, isFunction } from 'lodash-es'
import { useToggle, useCustomFieldValue } from '@vant/use'
import { createNamespace } from '../../utils'
import { getPopupProps, getComponentProps } from './utils'
import type { FormSchema } from './types'

const [name] = createNamespace('field-calendar')

export default defineComponent({
  name,

  props: {
    schema: {
      type: Object as PropType<FormSchema>,
      required: true,
    },
    modelValue: [String, Array],
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const model = ref<string | string[]>()
    const [visible, toggle] = useToggle()

    const format = (date: Date) => {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }

    const formatInput = () => {
      const format = props.schema.componentProps?.formatInput
      if (isFunction(format)) {
        return format(model.value)
      }
      if (isArray(model.value)) {
        return model.value.join('/')
      } else {
        return model.value
      }
    }

    const formatValue = () => {
      const type = props.schema.componentProps?.type
      const format = props.schema.componentProps?.formatValue
      if (isFunction(format)) {
        return format(model.value)
      }
      if (type === 'range' || type === 'multiple') {
        return model.value ?? []
      } else {
        return model.value ?? ''
      }
    }

    useCustomFieldValue(formatValue)

    const onConfirm = (dates: Date | Date[]) => {
      toggle(false)

      model.value = isArray(dates)
        ? dates.map((date) => format(date))
        : format(dates)
      emit('update:modelValue', formatValue())
    }

    watch(
      () => props.modelValue,
      (newVal) => {
        model.value = newVal as any
      },
      { immediate: true }
    )

    return () => (
      <>
        <input
          type="text"
          class="van-field__control"
          readonly
          value={formatInput()}
          disabled={props.schema.disabled}
          placeholder={props.schema.placeholder}
          onClick={() => toggle(!props.schema.disabled)}
        />
        <Calendar
          v-model:show={visible.value}
          title={props.schema.label as string}
          {...getPopupProps(props.schema)}
          {...getComponentProps(props.schema)}
          onConfirm={onConfirm}
        />
      </>
    )
  },
})
