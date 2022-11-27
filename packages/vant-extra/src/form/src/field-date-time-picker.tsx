import { defineComponent, ref, watch, computed, type PropType } from 'vue'
import {
  isString,
  isArray,
  isFunction,
  pick,
  intersection,
  isEmpty,
} from 'lodash-es'
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
    modelValue: [String, Array],
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const model = ref<string[]>([])
    const modelDate = ref<string[]>([])
    const modelTime = ref<string[]>([])
    const [visible, toggle] = useToggle()

    const formatInput = () => {
      const format = props.schema.componentProps?.formatInput
      if (isFunction(format)) {
        return format([modelDate.value, modelTime.value])
      }
      if (!isEmpty(model.value)) {
        return modelDate.value.join('-') + ' ' + modelTime.value.join(':')
      }
      return model.value.join('-')
    }

    const formatValue = () => {
      const format = props.schema.componentProps?.formatValue
      if (isFunction(format)) {
        return format([modelDate.value, modelTime.value])
      }
      if (!isEmpty(modelDate.value) && !isEmpty(modelTime.value)) {
        return modelDate.value.join('-') + ' ' + modelTime.value.join(':')
      }
      return model.value.join('-')
    }

    useCustomFieldValue(formatValue)

    const dateType: DatePickerColumnType[] = ['year', 'month', 'day']
    const timeType: TimePickerColumnType[] = ['hour', 'minute', 'second']
    const columnsType = computed<
      [DatePickerColumnType[], TimePickerColumnType[]]
    >(() => {
      const _columnsType = props.schema.componentProps?.columnsType
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

      modelDate.value = dateSelectedValues as string[]
      modelTime.value = timeSelectedValues as string[]
      model.value = [...modelDate.value, ...modelTime.value]
      emit('update:modelValue', formatValue())
    }

    watch(
      () => props.modelValue,
      (newVal) => {
        if (isArray(newVal)) {
          model.value = newVal.flat() as string[]
        } else if (isString(newVal)) {
          model.value = [...newVal.matchAll(/\d+/g)].map((item) => item[0])
        }
        modelDate.value = model.value.slice(0, columnsType.value[0].length)
        modelTime.value = model.value.slice(columnsType.value[0].length)
      },
      { immediate: true }
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
          <PickerGroup
            tabs={['选择日期', '选择时间']}
            title={props.schema.label as string}
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
              modelValue={modelDate.value}
              columnsType={columnsType.value[0]}
            />
            <TimePicker
              {...pick(
                getComponentProps(props.schema),
                Object.keys(timePickerProps)
              )}
              modelValue={modelTime.value}
              columnsType={columnsType.value[1]}
            />
          </PickerGroup>
        </Popup>
      </>
    )
  },
})
