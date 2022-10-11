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
    field: '输入内容',
    field_2: '输入内容描述输入内容描述',
    rate: 4,
    slider: 54,
    stepper: 3,
    switch: true,
    uploader: [
      {
        url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg',
      },
    ],
  })
})

const schemas: FormSchema[] = [
  {
    label: '输入框',
    name: 'field',
    component: 'Field',
    required: true,
    // rules: [{ required: true, message: '请输入内容' }],
    // placeholder: '请输入内容',
  },
  {
    label: '文本域',
    name: 'field_2',
    component: 'Field',
    required: true,
    // rules: [{ required: true, message: '请输入内容' }],
    // placeholder: '请输入内容',
    componentProps: {
      type: 'textarea',
      maxlength: 150,
      showWordLimit: true,
    },
  },
  {
    label: '评分',
    name: 'rate',
    component: 'Rate',
    required: true,
    rules: [
      { required: true, validator: (val) => val > 0, message: '请选择评分' },
    ],
  },
  {
    label: '滑块',
    name: 'slider',
    component: 'Slider',
    required: true,
    rules: [
      { required: true, validator: (val) => val > 0, message: '请选择滑块' },
    ],
  },
  {
    label: '步进器',
    name: 'stepper',
    component: 'Stepper',
    required: true,
    rules: [
      { required: true, validator: (val) => val > 1, message: '请选择步进器' },
    ],
  },
  {
    label: '开关',
    name: 'switch',
    component: 'Switch',
    required: true,
    rules: [
      { required: true, validator: (val) => !!val, message: '请选择开关' },
    ],
  },
  {
    label: '上传',
    name: 'uploader',
    component: 'Uploader',
    required: true,
    // rules: [{ required: true, message: '请上传文件' }],
  },
]

const onSubmit = (values: any) => {
  console.log(values)
}

const onFailed = (errorInfo: any) => {
  console.log('failed', errorInfo)
}
</script>
