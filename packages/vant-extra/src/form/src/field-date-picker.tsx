import { defineComponent, ref, type PropType } from 'vue'
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
  },

  setup(props) {
    const text = ref<string>()
    const model = ref<string[]>()
    const [visible, toggle] = useToggle()

    useCustomFieldValue(() => model.value)

    const onConfirm = ({ selectedOptions }: PickerConfirmEventParams) => {
      toggle(false)

      text.value = selectedOptions.map((option) => option?.text).join('-')
    }

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
        <Popup
          v-model:show={visible.value}
          position="bottom"
          {...getPopupProps(props.schema)}
        >
          <DatePicker
            v-model={model.value}
            {...getComponentProps(props.schema)}
            onCancel={() => toggle(false)}
            onConfirm={onConfirm}
          />
        </Popup>
      </>
    )
  },
})
