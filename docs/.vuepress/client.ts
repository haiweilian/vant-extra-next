import { defineClientConfig } from '@vuepress/client'
import Vant from 'vant'
import VaeUI from '@bfelib/vant-extra/src'
import '@vant/touch-emulator'

import 'vant/lib/index.css'
import '@bfelib/vant-extra/src/index.scss'
import './configs/styles/index.scss'

export default defineClientConfig({
  enhance({ app }) {
    app.use(Vant)
    app.use(VaeUI)
  },
})
