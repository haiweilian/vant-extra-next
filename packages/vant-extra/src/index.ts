import type { App } from 'vue'
import { BackTop } from './back-top'
import { Image, ImageGroup } from './image'

export * from './back-top'
export * from './image'

const components = [BackTop, Image, ImageGroup]

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
