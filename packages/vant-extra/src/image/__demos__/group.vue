<template>
  <vae-image-group>
    <vae-image
      v-for="src of list"
      :key="src"
      class="mr-4"
      width="100"
      height="100"
      :src="src"
    />
  </vae-image-group>
</template>

<script lang="ts" setup>
const list = [
  'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/tree.jpeg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg',
]
</script>
