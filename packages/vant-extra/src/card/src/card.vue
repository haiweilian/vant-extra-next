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

    <div v-if="title || $slots.title" :class="bem('title')">
      <slot name="title">{{ title }}</slot>
    </div>

    <div v-if="desc || $slots.desc" :class="bem('desc')">
      <slot name="desc">{{ desc }}</slot>
    </div>

    <div v-if="$slots.default" :class="bem('body')">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Image } from 'vant'
import { createNamespace } from '../../utils'
import { cardProps } from './props'

const [_, bem] = createNamespace('card')

defineOptions({
  name: 'vae-card',
})

defineProps(cardProps)
</script>
