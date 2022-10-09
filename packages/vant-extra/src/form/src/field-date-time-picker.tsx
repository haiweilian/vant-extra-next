import { defineComponent, ref, watch, type PropType } from 'vue'
import {
  Popup,
  PickerGroup,
  TimePicker,
  DatePicker,
  datePickerProps,
  timePickerProps,
  pickerGroupProps,
} from 'vant'
import type { PickerConfirmEventParams } from 'vant'
import { pick } from 'lodash-es'
import { useToggle, useCustomFieldValue } from '@vant/use'
import { createNamespace } from '../../utils'
import { getPopupProps, getComponentProps } from './utils'
import type { FormSchema } from './types'

const [name] = createNamespace('field-date-time-picker')

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
    const modelDate = ref<string | undefined>()
    const modelTime = ref<string | undefined>()
    const [visible, toggle] = useToggle()

    useCustomFieldValue(() => model.value)

    const onConfirm = ([
      { selectedValues: dateSelectedValues },
      { selectedValues: timeSelectedValues },
    ]: [PickerConfirmEventParams, PickerConfirmEventParams]) => {
      toggle(false)

      modelDate.value = dateSelectedValues.join('-')
      modelTime.value = timeSelectedValues.join(':')
      model.value = `${modelDate.value} ${modelTime.value}`
      emit('update:modelValue', model.value)
    }

    watch(
      () => props.modelValue,
      (newVal) => {
        model.value = newVal
        if (typeof newVal === 'string') {
          const [dateVal, timeVal] = newVal.split(' ')
          modelDate.value = dateVal
          modelTime.value = timeVal
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
          <PickerGroup
            {...pick(
              getComponentProps(props.schema),
              Object.keys(pickerGroupProps)
            )}
            onCancel={() => toggle(false)}
            onConfirm={onConfirm}
          >
            <DatePicker
              modelValue={modelDate.value ? modelDate.value.split('-') : []}
              {...pick(
                getComponentProps(props.schema),
                Object.keys(datePickerProps)
              )}
              columnsType={
                (getComponentProps(props.schema) as any).columnsType?.[0]
              }
            />
            <TimePicker
              modelValue={modelTime.value ? modelTime.value.split(':') : []}
              {...pick(
                getComponentProps(props.schema),
                Object.keys(timePickerProps)
              )}
              columnsType={
                (getComponentProps(props.schema) as any).columnsType?.[1]
              }
            />
          </PickerGroup>
        </Popup>
      </>
    )
  },
})
