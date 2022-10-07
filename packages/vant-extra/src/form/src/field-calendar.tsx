import dayjs from 'dayjs/esm/index'
import { defineComponent, ref, type PropType } from 'vue'
import { Calendar } from 'vant'
import { useToggle, useCustomFieldValue } from '@vant/use'
import { isDate, isString } from 'lodash-es'
import { createNamespace } from '../../utils'
import { getPopupProps, getComponentProps } from './utils'
import type { FormSchema } from './types'

const [name] = createNamespace('field-calendar')

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
    const model = ref<string[] | string>()
    const [visible, toggle] = useToggle()

    useCustomFieldValue(() => model.value)

    const format = 'YYYY-MM-DD'
    const onConfirm = (date: Date | Date[]) => {
      toggle(false)

      const dates = isDate(date)
        ? dayjs(date).format(format)
        : date.map((d) => dayjs(d).format(format))

      model.value = dates

      text.value = isString(dates) ? dates : dates.join('/')
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
        <Calendar
          v-model:show={visible.value}
          {...getPopupProps(props.schema)}
          {...getComponentProps(props.schema)}
          onConfirm={onConfirm}
        />
      </>
    )
  },
})
