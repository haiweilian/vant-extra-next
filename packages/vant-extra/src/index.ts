import type { App } from 'vue'
import { BackTop } from './back-top'

export * from './back-top'

const components = [BackTop]

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
