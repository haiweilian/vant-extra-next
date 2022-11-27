import { defineComponent, ref, watch, computed, nextTick } from 'vue'
import { Popup, Picker } from 'vant'
import { omit, isEmpty, isFunction } from 'lodash-es'
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
    const model = ref<Numeric[]>(props.modelValue)
    const options = ref<PickerConfirmEventParams['selectedOptions']>([])
    const [visible, toggle] = useToggle()

    const formatInput = () => {
      const format = props.schema.componentProps?.formatInput
      if (isFunction(format)) {
        return format(options.value)
      }
      const text = options.value.map((option) => option?.[fields.value.text])
      return text.join('/')
    }

    const formatValue = () => {
      const format = props.schema.componentProps?.formatValue
      if (isFunction(format)) {
        return format(model.value)
      }
      return model.value ?? []
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
    const pickerRef = ref<PickerInstance>()

    const onConfirm = ({
      selectedValues,
      selectedOptions,
    }: PickerConfirmEventParams) => {
      toggle(false)

      model.value = selectedValues
      options.value = selectedOptions
      emit('update:modelValue', selectedValues)
    }

    watch(
      () => [props.modelValue, props.schema],
      async () => {
        if (isEmpty(props.modelValue)) {
          await nextTick()
          model.value = []
          options.value = []
        } else {
          await nextTick()
          model.value = props.modelValue
          if (!pickerRef.value) return
          await nextTick()
          options.value = pickerRef.value.getSelectedOptions()
        }
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
          lazyRender={false}
          {...getPopupProps(props.schema)}
        >
          <Picker
            ref={pickerRef}
            title={props.schema.label as string}
            {...omit(getComponentProps(props.schema), [
              'options',
              'formatInput',
              'formatValue',
            ])}
            columns={columns.value}
            modelValue={isEmpty(model.value) ? undefined : model.value}
            onCancel={() => toggle(false)}
            onConfirm={onConfirm}
          />
        </Popup>
      </>
    )
  },
})
