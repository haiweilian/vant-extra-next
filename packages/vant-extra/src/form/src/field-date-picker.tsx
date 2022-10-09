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
    // const text = ref<string>()
    const model = ref<string | undefined>(props.modelValue)
    const [visible, toggle] = useToggle()

    useCustomFieldValue(() => model.value)

    const onConfirm = ({
      selectedValues,
    }: // selectedOptions,
    PickerConfirmEventParams) => {
      toggle(false)

      model.value = selectedValues.join('-')
      emit('update:modelValue', model.value)

      // text.value = selectedOptions.map((option) => option?.text).join('-')
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
            modelValue={model.value ? model.value.split('-') : []}
            {...getComponentProps(props.schema)}
            onCancel={() => toggle(false)}
            onConfirm={onConfirm}
          />
        </Popup>
      </>
    )
  },
})
