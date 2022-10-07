import type { App } from 'vue'
import { BackTop } from './back-top'
import { Card } from './card'
import { Form } from './form'
import { Image, ImageGroup } from './image'

export * from './back-top'
export * from './card'
export * from './form'
export * from './image'

const components = [BackTop, Card, Form, Image, ImageGroup]

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
