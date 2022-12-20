export {}

// Helper for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    VaeBackTop: typeof import('@bfelib/vant-extra')['BackTop']
    VaeCard: typeof import('@bfelib/vant-extra')['Card']
    VaeForm: typeof import('@bfelib/vant-extra')['Form']
    VaeImage: typeof import('@bfelib/vant-extra')['Image']
    VaeImageGroup: typeof import('@bfelib/vant-extra')['ImageGroup']
    VaeDescriptions: typeof import('@bfelib/vant-extra')['Descriptions']
    VaeDescriptionsItem: typeof import('@bfelib/vant-extra')['DescriptionsItem']
    VaeLink: typeof import('@bfelib/vant-extra')['Link']
  }
}
