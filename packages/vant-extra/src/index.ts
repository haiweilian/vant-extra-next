import type { App } from 'vue'
import { BackTop } from './back-top'
import { Card } from './card'
import { Form } from './form'
import { Image, ImageGroup } from './image'
import { Descriptions, DescriptionsItem } from './descriptions'

export * from './back-top'
export * from './card'
export * from './form'
export * from './image'
export * from './descriptions'

const components = [
  BackTop,
  Card,
  Form,
  Image,
  ImageGroup,
  Descriptions,
  DescriptionsItem,
]

export function install(app: App) {
  components.forEach((item) => {
    if (item.install!) {
      app.use(item)
    } else if (item.name) {
      app.component(item.name, item)
    }
  })
}

export default {
  install,
}
