export {}

// Helper for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    VaeBackTop: typeof import('@bfelib/vant-extra')['BackTop']
    VaeBackTopTsx: typeof import('@bfelib/vant-extra')['BackTopTsx']
  }
}
