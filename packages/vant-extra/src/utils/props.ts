import type { PropType, Ref, ComputedRef } from 'vue'

export type Recordable<T = any> = {
  [x: PropertyKey]: T
}

export type DynamicProps<T> = {
  [P in keyof T]: Ref<T[P]> | T[P] | ComputedRef<T[P]>
}

export const makeObjectProp = <T = Recordable>() => ({
  type: Object as PropType<T>,
  default: () => ({}),
})
