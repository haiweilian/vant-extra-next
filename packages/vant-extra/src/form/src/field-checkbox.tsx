import { defineComponent, ref, type PropType } from 'vue'
import { CheckboxGroup, Checkbox, Space } from 'vant'
import { omit } from 'lodash-es'
import { createNamespace } from '../../utils'
import { getComponentProps } from './utils'
import type { FormSchema } from './types'

const [name] = createNamespace('field-checkbox')

export interface CheckboxOptions {
  text: number | string
  value: number | string
  disabled?: boolean
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
    // const model = ref<any[]>()
    const options = ref<CheckboxOptions[]>(
      props.schema.componentProps?.options || []
    )

    return () => (
      <CheckboxGroup
        // v-model={model.value}
        {...omit(getComponentProps(props.schema), ['options'])}
      >
        <Space wrap>
          {options.value.map((item) => (
            <Checkbox name={item.value} disabled={item.disabled} shape="square">
              {item.text}
            </Checkbox>
          ))}
        </Space>
      </CheckboxGroup>
    )
  },
})
