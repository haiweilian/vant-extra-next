import { defineComponent, ref, watch, type PropType } from 'vue'
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
    modelValue: String,
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const model = ref<string | undefined>(props.modelValue)
    const [visible, toggle] = useToggle()

    useCustomFieldValue(() => model.value)

    const onConfirm = ({ selectedValues }: PickerConfirmEventParams) => {
      toggle(false)

      model.value = selectedValues.join('-')
      emit('update:modelValue', model.value)
    }

    watch(
      () => props.modelValue,
      (newVal) => {
        model.value = newVal
      }
    )

    return () => (
      <>
        <input
          type="text"
          class="van-field__control"
          readonly
          value={model.value}
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
            {...getComponentProps(props.schema)}
            modelValue={model.value ? model.value.split('-') : []}
            onCancel={() => toggle(false)}
            onConfirm={onConfirm}
          />
        </Popup>
      </>
    )
  },
})
