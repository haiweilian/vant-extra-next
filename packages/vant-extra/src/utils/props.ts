import { unref } from 'vue'
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

export const getDynamicProps = <T extends Object, U>(props: T): Partial<U> => {
  const ret: Recordable = {}

  Object.keys(props).map((key) => {
    return (ret[key] = unref((props as Recordable)[key]))
  })

  return ret as Partial<U>
}
