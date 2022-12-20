import { defineComponent, computed, h } from 'vue'
import { addUnit } from 'vant/es/utils'
import { createNamespace } from '../../utils'
import { linkProps } from './props'

const [name, bem] = createNamespace('link')

export default defineComponent({
  name,

  props: linkProps,

  emits: ['click'],

  setup(props, { emit, slots }) {
    const tag = computed(() => {
      if (props.disabled) {
        return <span></span>
      }
      if (props.href) {
        return <a></a>
      }
      if (props.to) {
        return <router-link></router-link>
      }
      return <a></a>
    })

    const linkProps = computed(() => {
      const { disabled, href, target, to, replace } = props
      if (disabled) {
        return {}
      }
      if (href) {
        return { href, target }
      }
      if (to) {
        return { to, target, replace }
      }
      return {}
    })

    const onClick = (event: MouseEvent) => {
      if (!props.disabled) {
        emit('click', event)
      }
    }

    return () =>
      h(
        tag.value,
        {
          ...linkProps.value,
          class: bem({
            [props.type]: true,
            [`underline-${props.underline}`]: props.underline !== 'none',
            disabled: props.disabled,
          }),
          style: {
            color: props.textColor,
            fontSize: addUnit(props.textSize),
          },
          onClick,
        },
        slots
      )
  },
})
