import { defineComponent, ref, watch, computed } from 'vue'
import { Popup, Picker } from 'vant'
import { omit, isFunction } from 'lodash-es'
import type { PropType } from 'vue'
import type { PickerOption, PickerConfirmEventParams } from 'vant'
import { numericProp, type Numeric } from 'vant/es/utils'
import { assignDefaultFields } from 'vant/es/picker/utils'
import { useToggle, useCustomFieldValue } from '@vant/use'
import { createNamespace } from '../../utils'
import { getPopupProps, getComponentProps } from './utils'
import type { FormSchema } from './types'

const [name] = createNamespace('field-picker-single')

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
    const model = ref<Numeric | undefined>(props.modelValue!)
    const options = ref<PickerOption>()
    const [visible, toggle] = useToggle()

    const formatInput = () => {
      const format = props.schema.componentProps?.formatInput
      if (isFunction(format)) {
        return format(options.value)
      }
      return options.value?.[fields.value.text]
    }

    const formatValue = () => {
      const format = props.schema.componentProps?.formatValue
      if (isFunction(format)) {
        return format(model.value)
      }
      return model.value ?? ''
    }

    useCustomFieldValue(formatValue)

    const fields = computed(() => {
      return assignDefaultFields(props.schema.componentProps?.columnsFieldNames)
    })
    const columns = computed(() => {
      return (
        props.schema.componentProps?.options ||
        props.schema.componentProps?.columns ||
        []
      )
    })

    const onConfirm = ({
      selectedValues,
      selectedOptions,
    }: PickerConfirmEventParams) => {
      toggle(false)

      model.value = selectedValues[0]
      options.value = selectedOptions[0]
      emit('update:modelValue', selectedValues[0])
    }

    watch(
      () => [props.modelValue, props.schema],
      async () => {
        model.value = props.modelValue
        options.value = columns.value.find(
          (item: any) => item[fields.value.value] === props.modelValue
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
          <Picker
            title={props.schema.label as string}
            {...omit(getComponentProps(props.schema), [
              'options',
              'formatInput',
              'formatValue',
            ])}
            columns={columns.value}
            modelValue={model.value ? [model.value] : undefined}
            onCancel={() => toggle(false)}
            onConfirm={onConfirm}
          />
        </Popup>
      </>
    )
  },
})
