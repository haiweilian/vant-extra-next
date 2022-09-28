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

  if (importStyle === 'scss') {
    return `@bfelib/vant-extra/${moduleType}/${dirName}/style/scss`
  } else {
    return `@bfelib/vant-extra/${moduleType}/${dirName}/style/index`
  }
}

/**
 * Resolver for Vae
 *
 * @link https://github.com/bfelib/vant-extra
 */
export function VaeResolver(
  options: VaeResolverOptions = {}
): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.startsWith('Vae')) {
        const partialName = name.slice(4)
        return {
          name: partialName,
          from: `@bfelib/vant-extra/${moduleType}`,
          sideEffects: getSideEffects(kebabCase(partialName), options),
        }
      }
    },
  }
}
