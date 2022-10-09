import { onMounted, type Component } from 'vue'
import type { FormComponentType } from './types'
import { add, del } from './form-component'

export function useComponentRegister(name: FormComponentType, comp: Component) {
  add(name, comp)

  onMounted(() => {
    del(name)
  })
}
