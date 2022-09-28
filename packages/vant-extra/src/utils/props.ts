import type { PropType } from 'vue'

export interface Recordable {
  [x: PropertyKey]: any
}

export const makeObjectProp = <T = Recordable>() => ({
  type: Object as PropType<T>,
  default: () => ({}),
})
