import { defineComponent, computed, type PropType } from 'vue'
import { CheckboxGroup, Checkbox, Space } from 'vant'
import { omit } from 'lodash-es'
import { createNamespace } from '../../utils'
import { getComponentProps } from './utils'
import type { FormSchema } from './types'

const [name] = createNamespace('field-checkbox-group')

export interface CheckboxOptions {
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
    const options = computed<CheckboxOptions[]>(() => {
      return props.schema.componentProps?.options || []
    })

    return () => (
      <CheckboxGroup {...omit(getComponentProps(props.schema), ['options'])}>
        <Space wrap>
          {options.value.map((item) => (
            <Checkbox
              key={item.value}
              name={item.value}
              disabled={item.disabled}
              shape="square"
            >
              {item.text}
            </Checkbox>
          ))}
        </Space>
      </CheckboxGroup>
    )
  },
})
