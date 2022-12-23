import { ref, watch, computed, defineComponent } from 'vue'
import { Loading, CellGroup, Cell, Icon } from 'vant'
import { pick } from 'lodash-es'
import Toolbar, {
  pickerToolbarPropKeys,
  pickerToolbarSlots,
} from 'vant/es/picker/PickerToolbar'
import { assignDefaultFields } from 'vant/es/picker/utils'
import { useExpose } from 'vant/es/composables/use-expose'
import { createNamespace } from '../../utils'
import { checkerProps } from './props'
import type { CheckerOption, CheckerExpose } from './types'

const [name, bem] = createNamespace('checker')

export default defineComponent({
  name,

  props: checkerProps,

  emits: ['confirm', 'cancel', 'change', 'update:modelValue'],

  setup(props, { emit, slots }) {
    const selectedValues = ref(props.modelValue)

    const fields = computed(() => assignDefaultFields(props.columnsFieldNames))

    const selectedOptions = computed(() =>
      props.columns.filter((option) =>
        selectedValues.value.includes(option[fields.value.value])
      )
    )

    const getEventParams = () => ({
      selectedValues: selectedValues.value,
      selectedOptions: selectedOptions.value,
    })

    const onChange = (option: CheckerOption) => {
      if (option.disabled) return

      const value = option[fields.value.value]
      if (props.multiple) {
        if (selectedValues.value.includes(value)) {
          selectedValues.value = selectedValues.value.filter((v) => v !== value)
        } else {
          selectedValues.value.push(value)
        }
      } else {
        if (selectedValues.value.includes(value)) {
          selectedValues.value = []
        } else {
          selectedValues.value = [value]
        }
      }

      emit('update:modelValue', selectedValues.value)
      emit('change', getEventParams())
    }

    const confirm = () => {
      emit('confirm', getEventParams())
    }

    const cancel = () => {
      emit('cancel', getEventParams())
    }

    const renderToolbar = () => {
      if (props.showToolbar) {
        return (
          <Toolbar
            v-slots={pick(slots, pickerToolbarSlots)}
            {...pick(props, pickerToolbarPropKeys)}
            onConfirm={confirm}
            onCancel={cancel}
          />
        )
      }
    }

    const renderColumns = () => {
      return (
        <CellGroup class={bem('columns')}>
          {props.columns.map((option) => (
            <Cell
              v-slots={{
                'right-icon': () =>
                  selectedValues.value.includes(option[fields.value.value]) ? (
                    <Icon class={bem('icon', ['active'])} name="success" />
                  ) : null,
              }}
              class={bem('cell', {
                disabled: option.disabled,
              })}
              title={option[fields.value.text]}
              onClick={() => onChange(option)}
            />
          ))}
        </CellGroup>
      )
    }

    watch(
      () => props.modelValue,
      (newValues) => {
        selectedValues.value = newValues
      },
      { deep: true }
    )

    useExpose<CheckerExpose>({
      confirm,
      getSelectedOptions: () => selectedOptions.value,
    })

    return () => (
      <div class={bem()}>
        {props.toolbarPosition === 'top' ? renderToolbar() : null}
        {props.loading ? <Loading class={bem('loading')} /> : null}
        {slots['columns-top']?.()}
        {renderColumns()}
        {slots['columns-bottom']?.()}
        {props.toolbarPosition === 'bottom' ? renderToolbar() : null}
      </div>
    )
  },
})
