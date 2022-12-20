import type {
  ComponentResolver,
  SideEffectsInfo,
} from 'unplugin-vue-components/types'
import { kebabCase } from 'unplugin-vue-components'

const isSSR = Boolean(
  process.env.SSR ||
    process.env.SSG ||
    process.env.VITE_SSR ||
    process.env.VITE_SSG
)

const moduleType = isSSR ? 'lib' : 'es'

export interface VaeResolverOptions {
  /**
   * import style css or scss along with components
   *
   * @default true
   */
  importStyle?: boolean | 'css' | 'scss'
}

function getSideEffects(
  dirName: string,
  options: VaeResolverOptions
): SideEffectsInfo | undefined {
  const { importStyle = true } = options

  if (!importStyle || isSSR) return

  if (['image-group'].includes(dirName)) {
    dirName = 'image'
  }

  if (['descriptions-item'].includes(dirName)) {
    dirName = 'descriptions'
  }

  if (importStyle === 'scss') {
    return `vant-extra-next/${moduleType}/${dirName}/style/scss`
  } else {
    return `vant-extra-next/${moduleType}/${dirName}/style/index`
  }
}

/**
 * Resolver for Vae
 *
 * @link https://github.com/haiweilian/vant-extra-next
 */
export function VaeResolver(
  options: VaeResolverOptions = {}
): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.startsWith('Vae')) {
        const partialName = name.slice(3)
        return {
          name: partialName,
          from: `vant-extra-next/${moduleType}`,
          sideEffects: getSideEffects(kebabCase(partialName), options),
        }
      }
    },
  }
}
