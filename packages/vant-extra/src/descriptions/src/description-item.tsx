import { defineComponent } from 'vue'
import { createNamespace } from '../../utils'
import { descriptionsItemProps } from './props'

const [name] = createNamespace('descriptions-item')

export default defineComponent({
  name,

  props: descriptionsItemProps,
})
