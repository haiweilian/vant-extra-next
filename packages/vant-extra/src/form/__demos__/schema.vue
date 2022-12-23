<template>
  <vae-form :schemas="schemas">
    <template #field_text="{ name, schema }">
      <van-field v-bind="schema.fieldProps">
        <template #input> 自定义 {{ name }} 渲染 </template>
      </van-field>
    </template>
  </vae-form>
</template>

<script lang="tsx" setup>
import { ref } from 'vue'
import type { FormSchema } from 'vant-extra-next'

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
    render({ name, schema }) {
      return (
        <van-field {...schema.fieldProps}>
          {{ input: () => `自定义 ${name} 渲染` }}
        </van-field>
      )
    },
  },
])

setTimeout(() => {
  schemas.value[0].hidden = false
}, 2000)
</script>
