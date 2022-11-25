<template>
  <button :class="bem()"><%= pascalCaseName %></button>
</template>

<script lang="ts" setup>
import { createNamespace } from '../../utils'
import { <%= camelCaseName %>Props } from './props'

const [_, bem] = createNamespace('<%= name %>')

defineOptions({
  name: 'vae-<%= name %>',
})

defineProps(<%= camelCaseName %>Props)
</script>
