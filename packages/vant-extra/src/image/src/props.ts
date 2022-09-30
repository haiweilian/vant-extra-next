import { truthProp, extend } from 'vant/es/utils'
import { imageProps as vantImageProps } from 'vant'
import type { ExtractPropTypes } from 'vue'
import type { ImagePreviewOptions } from 'vant'
import { makeObjectProp } from '../../utils'

export const imageProps = extend(vantImageProps, {
  /**
   * 缩略图
   */
  thumbnail: String,
  /**
   * 是否点击展示预览图
   */
  previewImage: truthProp,
  /**
   * 全屏图片预览的配置项
   */
  previewOptions: makeObjectProp<ImagePreviewOptions>(),
})

export type ImageProps = ExtractPropTypes<typeof imageProps>

export const imageGroupProps = {
  /**
   * 是否点击展示预览图
   */
  previewImage: truthProp,
  /**
   * 全屏图片预览的配置项
   */
  previewOptions: makeObjectProp<ImagePreviewOptions>(),
}

export type ImageGroupProps = ExtractPropTypes<typeof imageGroupProps>
