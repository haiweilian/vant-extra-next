import { defineComponent, ref, watch, computed, type PropType } from 'vue'
import { isString, isArray, pick, intersection } from 'lodash-es'
import {
  Popup,
  PickerGroup,
  TimePicker,
  DatePicker,
  datePickerProps,
  timePickerProps,
  pickerGroupProps,
} from 'vant'
import type {
  DatePickerColumnType,
  TimePickerColumnType,
  PickerConfirmEventParams,
} from 'vant'
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

    const dateType: DatePickerColumnType[] = ['year', 'month', 'day']
    const timeType: TimePickerColumnType[] = ['hour', 'minute', 'second']

    const columnsType = computed<
      [DatePickerColumnType[], TimePickerColumnType[]]
    >(() => {
      const _columnsType = getComponentProps(props.schema).columnsType
      if (isArray(_columnsType)) {
        return [
          intersection(_columnsType, dateType),
          intersection(_columnsType, timeType),
        ]
      } else {
        return [dateType, timeType]
      }
    })

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
        if (isString(newVal)) {
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
            tabs={['选择日期', '选择时间']}
            {...pick(
              getComponentProps(props.schema),
              Object.keys(pickerGroupProps)
            )}
            onCancel={() => toggle(false)}
            onConfirm={onConfirm}
          >
            <DatePicker
              {...pick(
                getComponentProps(props.schema),
                Object.keys(datePickerProps)
              )}
              modelValue={modelDate.value ? modelDate.value.split('-') : []}
              columnsType={columnsType.value[0]}
            />
            <TimePicker
              {...pick(
                getComponentProps(props.schema),
                Object.keys(timePickerProps)
              )}
              modelValue={modelTime.value ? modelTime.value.split(':') : []}
              columnsType={columnsType.value[1]}
            />
          </PickerGroup>
        </Popup>
      </>
    )
  },
})
