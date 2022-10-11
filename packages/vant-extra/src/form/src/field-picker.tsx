import { defineComponent, ref, watch, computed, nextTick } from 'vue'
import { Popup, Picker } from 'vant'
import { omit } from 'lodash-es'
import type { PropType } from 'vue'
import type { PickerInstance, PickerConfirmEventParams } from 'vant'
import { makeArrayProp, type Numeric } from 'vant/es/utils'
import { assignDefaultFields } from 'vant/es/picker/utils'
import { useToggle, useCustomFieldValue } from '@vant/use'
import { createNamespace } from '../../utils'
import { getPopupProps, getComponentProps } from './utils'
import type { FormSchema } from './types'

const [name] = createNamespace('field-picker')

export default defineComponent({
  name,

  props: {
    schema: {
      type: Object as PropType<FormSchema>,
      required: true,
    },
    modelValue: makeArrayProp<Numeric>(),
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const text = ref<string>()
    const model = ref<Numeric[]>(props.modelValue)
    const [visible, toggle] = useToggle()

    useCustomFieldValue(() => model.value)

    const fields = computed(() =>
      assignDefaultFields(props.schema.componentProps?.columnsFieldNames)
    )
    const pickerRef = ref<PickerInstance>()

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

      model.value = selectedValues
      emit('update:modelValue', selectedValues)

      text.value = formatext(selectedOptions)
    }

    watch(
      () => [props.modelValue, props.schema],
      async () => {
        if (!pickerRef.value) return
        model.value = props.modelValue
        await nextTick()
        text.value = formatext(pickerRef.value.getSelectedOptions())
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
          lazyRender={false}
          {...getPopupProps(props.schema)}
        >
          <Picker
            ref={pickerRef}
            title={props.schema.label as string}
            {...omit(getComponentProps(props.schema), ['options'])}
            columns={
              props.schema.componentProps?.options ||
              props.schema.componentProps?.columns ||
              []
            }
            modelValue={model.value}
            onCancel={() => toggle(false)}
            onConfirm={onConfirm}
          />
        </Popup>
      </>
    )
  },
})
