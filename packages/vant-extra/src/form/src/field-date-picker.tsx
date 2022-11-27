import { defineComponent, ref, watch, type PropType } from 'vue'
import { omit, isString, isArray, isFunction } from 'lodash-es'
import { Popup, DatePicker, type PickerConfirmEventParams } from 'vant'
import { useToggle, useCustomFieldValue } from '@vant/use'
import { createNamespace } from '../../utils'
import { getPopupProps, getComponentProps } from './utils'
import type { FormSchema } from './types'

const [name] = createNamespace('field-date-picker')

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
    const model = ref<string[]>([])
    const [visible, toggle] = useToggle()

    const formatInput = () => {
      const format = props.schema.componentProps?.formatInput
      if (isFunction(format)) {
        return format(model.value)
      }
      return model.value.join('-')
    }

    const formatValue = () => {
      const format = props.schema.componentProps?.formatValue
      if (isFunction(format)) {
        return format(model.value)
      }
      return model.value.join('-')
    }

    useCustomFieldValue(formatValue)

    const onConfirm = ({ selectedValues }: PickerConfirmEventParams) => {
      toggle(false)

      model.value = selectedValues as string[]
      emit('update:modelValue', formatValue())
    }

    watch(
      () => props.modelValue,
      (newVal) => {
        if (isArray(newVal)) {
          model.value = newVal as string[]
        } else if (isString(newVal)) {
          model.value = [...newVal.matchAll(/\d+/g)].map((item) => item[0])
        }
      },
      {
        immediate: true,
      }
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
        <Popup
          v-model:show={visible.value}
          position="bottom"
          {...getPopupProps(props.schema)}
        >
          <DatePicker
            title={props.schema.label as string}
            {...omit(getComponentProps(props.schema), [
              'formatInput',
              'formatValue',
            ])}
            modelValue={model.value}
            onCancel={() => toggle(false)}
            onConfirm={onConfirm}
          />
        </Popup>
      </>
    )
  },
})
