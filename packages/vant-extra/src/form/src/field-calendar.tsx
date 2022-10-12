import dayjs from 'dayjs'
import { defineComponent, ref, watch, type PropType } from 'vue'
import { Calendar } from 'vant'
import { isString, isArray } from 'lodash-es'
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
    modelValue: [String, Array] as PropType<string | string[]>,
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const text = ref<string>()
    const model = ref<string | string[] | undefined>(props.modelValue)
    const defaultDate = ref<Date[] | Date | undefined>()
    const [visible, toggle] = useToggle()

    useCustomFieldValue(() => model.value)

    const format = 'YYYY-MM-DD'

    const onConfirm = (dates: Date | Date[]) => {
      toggle(false)

      defaultDate.value = dates

      const values = isArray(dates)
        ? dates.map((date) => dayjs(date).format(format))
        : dayjs(dates).format(format)

      model.value = values
      emit('update:modelValue', values)

      text.value = isArray(values) ? values.join('/') : values
    }

    watch(
      () => props.modelValue,
      (newVal) => {
        model.value = newVal
        if (isString(newVal)) {
          text.value = newVal
          defaultDate.value = dayjs(newVal).toDate()
        } else if (isArray(newVal)) {
          text.value = newVal.join('/')
          defaultDate.value = newVal.map((date) => dayjs(date).toDate())
        }
      },
      { immediate: true }
    )

    return () => (
      <>
        <input
          type="text"
          class="van-field__control"
          readonly
          value={text.value}
          disabled={props.schema.disabled}
          placeholder={props.schema.placeholder}
          onClick={() => toggle(!props.schema.disabled)}
        />
        <Calendar
          v-model:show={visible.value}
          defaultDate={defaultDate.value}
          title={props.schema.label as string}
          {...getPopupProps(props.schema)}
          {...getComponentProps(props.schema)}
          onConfirm={onConfirm}
        />
      </>
    )
  },
})
