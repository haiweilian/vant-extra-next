import { withInstall } from 'vant/es/utils'
import _Image from './src/image'
import _ImageGroup from './src/image-group'

export const Image = withInstall(_Image)
export const ImageGroup = withInstall(_ImageGroup)
export default Image

export * from './src/props'
