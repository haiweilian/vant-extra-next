import { defineComponent, ref, watch, computed } from 'vue'
import { Popup, Picker } from 'vant'
import type { PropType } from 'vue'
import type { PickerOption, PickerConfirmEventParams } from 'vant'
import { numericProp, type Numeric } from 'vant/es/utils'
import { assignDefaultFields } from 'vant/es/picker/utils'
import { useToggle, useCustomFieldValue } from '@vant/use'
import { createNamespace } from '../../utils'
import { getPopupProps, getComponentProps } from './utils'
import type { FormSchema } from './types'

const [name] = createNamespace('field-select')

export default defineComponent({
  name,

  props: {
    schema: {
      type: Object as PropType<FormSchema>,
      required: true,
    },
    modelValue: numericProp,
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const text = ref<string>()
    const model = ref<Numeric | undefined>(props.modelValue!)
    const [visible, toggle] = useToggle()

    useCustomFieldValue(() => model.value)

    const fields = computed(() =>
      assignDefaultFields(props.schema.componentProps?.columnsFieldNames)
    )

    const formatext = (
      selectedOptions: PickerConfirmEventParams['selectedOptions']
    ) => {
      return selectedOptions
        .map((option) => option?.[fields.value.text])
        .join('/')
    }

    const onConfirm = ({
      selectedValues,
      selectedOptions,
    }: PickerConfirmEventParams) => {
      toggle(false)

      model.value = selectedValues[0]
      emit('update:modelValue', selectedValues[0])

      text.value = formatext(selectedOptions)
    }

    watch(
      () => [props.modelValue, props.schema],
      async () => {
        model.value = props.modelValue
        const columns: PickerOption[] =
          props.schema.componentProps?.options ||
          props.schema.componentProps?.columns ||
          []
        text.value = formatext(
          columns.filter(
            (item) => item[fields.value.value] === props.modelValue
          )
        )
      },
      {
        deep: true,
        immediate: true,
      }
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
        <Popup
          v-model:show={visible.value}
          position="bottom"
          {...getPopupProps(props.schema)}
        >
          <Picker
            modelValue={model.value ? [model.value] : []}
            {...getComponentProps(props.schema)}
            columns={
              props.schema.componentProps?.options ||
              props.schema.componentProps?.columns ||
              []
            }
            onCancel={() => toggle(false)}
            onConfirm={onConfirm}
          />
        </Popup>
      </>
    )
  },
})
