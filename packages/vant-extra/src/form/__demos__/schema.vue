<template>
  <vae-form :schemas="schemas">
    <template #field_text="{ name }"> {{ name }}：自定义 slot 渲染 </template>
  </vae-form>
</template>

<script lang="tsx" setup>
import type { FormSchema } from '@bfelib/vant-extra'

const schemas: FormSchema[] = [
  {
    label: '输入框',
    name: 'field',
    component: 'Field',
    required: true,
    rules: [{ required: true, message: '请输入内容' }],
    placeholder: '请输入内容',
    hidden: true,
  },
  {
    label: '输入框',
    name: 'field_2',
    component: 'Field',
    required: true,
    rules: [{ required: true, message: '请输入内容' }],
    placeholder: '请输入内容',
    hidden: () => false,
  },
  {
    label: '输入框',
    name: 'field_3',
    component: 'Field',
    required: true,
    rules: [{ required: true, message: '请输入内容' }],
    slot: 'field_text',
  },
  {
    label: '输入框',
    name: 'field_4',
    component: 'Field',
    required: true,
    rules: [{ required: true, message: '请输入内容' }],
    render({ name }) {
      return <div>{name}：自定义 render 渲染</div>
    },
  },
]
</script>
