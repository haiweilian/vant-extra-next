<template>
  <vae-form :schemas="schemas">
    <template #field_text="{ name }"> {{ name }}：自定义 slot 渲染 </template>
  </vae-form>
</template>

<script lang="tsx" setup>
import { ref } from 'vue'
import type { FormSchema } from '@bfelib/vant-extra'

const schemas = ref<FormSchema[]>([
  {
    label: '输入框',
    name: 'field',
    component: 'Field',
    required: true,
    hidden: true,
  },
  {
    label: '输入框',
    name: 'field_2',
    component: 'Field',
    required: true,
    hidden: () => false,
  },
  {
    label: '输入框',
    name: 'field_3',
    component: 'Field',
    required: true,
    slot: 'field_text',
  },
  {
    label: '输入框',
    name: 'field_4',
    component: 'Field',
    required: true,
    render({ name }) {
      return <div>{name}：自定义 render 渲染</div>
    },
  },
])

setTimeout(() => {
  schemas.value[0].hidden = false
}, 2000)
</script>
