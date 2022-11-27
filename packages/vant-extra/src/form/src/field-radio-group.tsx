import { defineComponent, ref, type PropType } from 'vue'
import { RadioGroup, Radio, Space } from 'vant'
import { omit } from 'lodash-es'
import { createNamespace } from '../../utils'
import { getComponentProps } from './utils'
import type { FormSchema } from './types'

const [name] = createNamespace('field-radio-group')

export interface RadioOptions {
  text: number | string
  value: number | string
  disabled?: boolean
  [x: PropertyKey]: unknown
}

export default defineComponent({
  name,

  props: {
    schema: {
      type: Object as PropType<FormSchema>,
      required: true,
    },
  },

  setup(props) {
    const options = ref<RadioOptions[]>(
      props.schema.componentProps?.options || []
    )

    return () => (
      <RadioGroup {...omit(getComponentProps(props.schema), ['options'])}>
        <Space wrap>
          {options.value.map((item) => (
            <Radio key={item.value} name={item.value} disabled={item.disabled}>
              {item.text}
            </Radio>
          ))}
        </Space>
      </RadioGroup>
    )
  },
})
