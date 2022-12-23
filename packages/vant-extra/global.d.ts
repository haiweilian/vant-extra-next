export {}

// Helper for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    VaeBackTop: typeof import('vant-extra-next')['BackTop']
    VaeCard: typeof import('vant-extra-next')['Card']
    VaeForm: typeof import('vant-extra-next')['Form']
    VaeImage: typeof import('vant-extra-next')['Image']
    VaeImageGroup: typeof import('vant-extra-next')['ImageGroup']
    VaeDescriptions: typeof import('vant-extra-next')['Descriptions']
    VaeDescriptionsItem: typeof import('vant-extra-next')['DescriptionsItem']
    VaeLink: typeof import('vant-extra-next')['Link']
    VaeChecker: typeof import('vant-extra-next')['Checker']
  }
}
