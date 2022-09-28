export {}

// Helper for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    VaeBackTop: typeof import('@bfelib/vant-extra')['BackTop']
    VaeImage: typeof import('@bfelib/vant-extra')['Image']
    VaeImageGroup: typeof import('@bfelib/vant-extra')['ImageGroup']
  }
}
