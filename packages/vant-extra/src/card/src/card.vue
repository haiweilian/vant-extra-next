<template>
  <div :class="bem({ shadow })">
    <slot name="image">
      <Image
        v-if="src"
        :class="bem('image')"
        :src="src"
        :fit="fit"
        :height="height"
      />
    </slot>

    <slot name="title">
      <div v-if="title" :class="bem('title')">{{ title }}</div>
    </slot>

    <slot name="desc">
      <div v-if="desc" :class="bem('desc')">
        {{ desc }}
      </div>
    </slot>

    <slot></slot>

    <div v-if="$slots.extra" :class="bem('extra')">
      <slot name="extra" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Image } from 'vant'
import { createNamespace } from '../../utils'
import { cardProps } from './props'

const [_, bem] = createNamespace('card')

defineOptions({
  name: 'VaeCard',
})

defineProps(cardProps)
</script>
