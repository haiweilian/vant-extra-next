import { onMounted } from 'vue'
import { defineClientConfig } from '@vuepress/client'
import Vant from 'vant'
import VaeUI from '@bfelib/vant-extra/src'
import '@vant/touch-emulator'

import 'vant/lib/index.css'
import '@bfelib/vant-extra/src/index.scss'
import './configs/styles/index.scss'

const toggleVantTheme = () => {
  if (document.querySelector('html.dark')) {
    document.querySelector('html')?.classList.add('van-theme-dark')
  } else {
    document.querySelector('html')?.classList.remove('van-theme-dark')
  }
}

export default defineClientConfig({
  enhance({ app }) {
    app.use(Vant)
    app.use(VaeUI)
  },
  setup() {
    onMounted(() => {
      toggleVantTheme()
      document.documentElement.addEventListener('click', (e) => {
        for (const path of e.composedPath()) {
          if (
            (path as Element).classList?.contains('toggle-color-mode-button')
          ) {
            return toggleVantTheme()
          }
        }
      })
    })
  },
})
