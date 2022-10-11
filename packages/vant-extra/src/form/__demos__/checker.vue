<template>
  <vae-form
    ref="formRef"
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
import { ref, onMounted } from 'vue'
import type { FormSchema, FormAction } from '@bfelib/vant-extra'

const formRef = ref<FormAction>()
onMounted(() => {
  // console.log(formRef.value)

  formRef.value?.setValues({
    checkbox: ['1', '2'],
    radio: '1',
  })
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
