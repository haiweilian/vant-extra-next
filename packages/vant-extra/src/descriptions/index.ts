import { withInstall } from 'vant/es/utils'
import _Descriptions from './src/descriptions'
import _DescriptionsItem from './src/description-item'

export const Descriptions = withInstall(_Descriptions)
export const DescriptionsItem = withInstall(_DescriptionsItem)
export default Descriptions

export * from './src/props'
