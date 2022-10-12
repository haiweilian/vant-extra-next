<template>
  <vae-form
    v-model="model"
    :schemas="schemas"
    @submit="onSubmit"
    @failed="onFailed"
  >
    <div style="margin: 30px 30px 0">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </vae-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import type { FormSchema } from '@bfelib/vant-extra'

const model = reactive({
  checkbox: ['1', '2'],
  radio: '1',
})

const schemas: FormSchema[] = [
  {
    label: '多选框',
    name: 'checkbox',
    component: 'Checkbox',
    required: true,
    componentProps: {
      options: [
        {
          text: '选项一',
          value: '1',
        },
        {
          text: '选项二',
          value: '2',
        },
        {
          text: '选项三',
          value: '3',
          disabled: true,
        },
      ],
    },
  },
  {
    label: '单选框',
    name: 'radio',
    component: 'Radio',
    required: true,
    componentProps: {
      options: [
        {
          text: '选项一',
          value: '1',
        },
        {
          text: '选项二',
          value: '2',
        },
        {
          text: '选项三',
          value: '3',
          disabled: true,
        },
      ],
    },
  },
]

const onSubmit = (values: any) => {
  console.log(values)
}

const onFailed = (errorInfo: any) => {
  console.log('failed', errorInfo)
}
</script>
