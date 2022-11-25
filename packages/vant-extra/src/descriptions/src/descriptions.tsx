import { defineComponent, type VNode } from 'vue'
import { isObject, isFunction } from 'lodash-es'
import { createNamespace, flattedChildren } from '../../utils'
import { descriptionsProps } from './props'

const [name, bem] = createNamespace('descriptions')

export default defineComponent({
  name,

  props: descriptionsProps,

  setup(props, { slots }) {
    const filledNode = (
      node: VNode,
      span: number,
      count: number,
      last = false
    ) => {
      if (!node.props) {
        node.props = {}
      }
      if (span > count) {
        node.props.span = count
      }
      if (last) {
        node.props.span = span
      }
      return node
    }

    const getRows = () => {
      const children = flattedChildren(slots.default?.() || []).filter(
        (node: any) => node?.type?.name === 'vae-descriptions-item'
      ) as VNode[]

      const rows: VNode[][] = []
      let temp: VNode[] = []
      let count = props.column
      let totalSpan = 0

      children.forEach((node, index) => {
        const span = node.props?.span || 1

        if (index < children.length - 1) {
          totalSpan += span > count ? count : span
        }

        if (index === children.length - 1) {
          const lastSpan = props.column - (totalSpan % props.column)
          temp.push(filledNode(node, lastSpan, count, true))
          rows.push(temp)
          return
        }

        if (span < count) {
          count -= span
          temp.push(node)
        } else {
          temp.push(filledNode(node, span, count))
          rows.push(temp)
          count = props.column
          temp = []
        }
      })

      return rows
    }

    const getSlots = (node: VNode, name: string) => {
      if (isObject(node.children) && !Array.isArray(node.children)) {
        if (isFunction(node.children[name])) {
          return (node.children[name] as Function)()
        }
        return null
      }
      return null
    }

    const renderHead = () => {
      if (props.title || props.extra || slots.title || slots.extra) {
        return (
          <div class={bem('header')}>
            <div class={bem('title')}>
              {slots.title ? slots.title() : props.title}
            </div>
            <div class={bem('extra')}>
              {slots.extra ? slots.extra() : props.extra}
            </div>
          </div>
        )
      }
      return null
    }

    const renderBody = () => {
      return (
        <div class={bem('body')}>
          <table class={bem('table')}>
            <tbody>
              {getRows().map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      colspan={col.props?.span || 1}
                      class={bem('cell')}
                    >
                      <div class={bem('container')}>
                        <span
                          class={[
                            bem('label'),
                            props.labelClass,
                            col.props?.labelClass,
                          ]}
                        >
                          {getSlots(col, 'label') || col.props?.label}
                        </span>
                        <span class={bem('content')}>
                          {getSlots(col, 'default')}
                        </span>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }

    return () => (
      <div
        class={bem({
          colon: props.colon,
          [props.size]: true,
        })}
      >
        {renderHead()}
        {renderBody()}
      </div>
    )
  },
})
