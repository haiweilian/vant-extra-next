import { defineComponent, type InjectionKey } from 'vue'
import { showImagePreview } from 'vant'
import { extend } from 'vant/es/utils'
import { useChildren } from '@vant/use'
import { createNamespace } from '../../utils'
import { imageGroupProps, type ImageProps } from './props'

const [name] = createNamespace('image-group')

export type ImageProvide = {
  handleImagePreview: (index: number) => void
}

export const IMAGE_KEY: InjectionKey<ImageProvide> = Symbol(name)

export default defineComponent({
  name,

  props: imageGroupProps,

  setup(props, { slots }) {
    const { children, linkChildren } = useChildren(IMAGE_KEY)

    const handleImagePreview = (index: number) => {
      if (!props.previewImage) return
      showImagePreview(
        extend(
          {
            images: children.map((child) => (child.$props as ImageProps).src),
            startPosition: index,
          },
          props.previewOptions
        )
      )
    }

    linkChildren({
      handleImagePreview,
    })

    return () => slots.default?.()
  },
})
