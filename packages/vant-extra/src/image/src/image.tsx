import { defineComponent } from 'vue'
import { Image, showImagePreview } from 'vant'
import { extend } from 'vant/es/utils'
import { useParent } from '@vant/use'
import { createNamespace } from '../../utils'
import { imageProps } from './props'
import { IMAGE_KEY } from './image-group'

const [name] = createNamespace('image')

export default defineComponent({
  name,

  props: imageProps,

  emits: ['click'],

  setup(props, { slots }) {
    const { parent, index } = useParent(IMAGE_KEY)

    const handleImagePreview = () => {
      if (!props.previewImage) {
        return
      }

      if (parent) {
        parent.handleImagePreview(index.value)
        return
      }

      showImagePreview(
        extend(
          {
            images: [props.src],
          },
          props.previewOptions
        )
      )
    }

    return () => (
      <Image
        v-slots={slots}
        {...props}
        src={props.thumbnail || props.src}
        onClick={handleImagePreview}
      />
    )
  },
})
