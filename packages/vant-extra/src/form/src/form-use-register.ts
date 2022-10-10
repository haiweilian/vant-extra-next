import { onMounted, type Component } from 'vue'
import { add, del } from './form-component'
import type { FormComponentType } from './types'

export const formComponentAdd = add

export const formComponentDel = del

export function useFormComponent(name: FormComponentType, comp: Component) {
  add(name, comp)

  onMounted(() => {
    del(name)
  })
}
