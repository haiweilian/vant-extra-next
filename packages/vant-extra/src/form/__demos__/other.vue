<template>
  <vae-form
    ref="formRef"
    :schemas="schemas"
    @submit="onSubmit"
    @failed="onFailed"
  >
    <div style="margin: 30px">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </vae-form>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { areaList } from '@vant/area-data'
import type { FormSchema, FormAction } from '@bfelib/vant-extra'

const formRef = ref<FormAction>()
onMounted(() => {
  console.log(formRef.value)

  formRef.value?.setValues({
    area: '120106',
    cascader: '320100',
  })
})

const schemas: FormSchema[] = [
  {
    label: '省市区',
    name: 'area',
    component: 'Area',
    placeholder: '请选择省市区',
    required: true,
    rules: [{ required: true, message: '请选择省市区' }],
    componentProps: {
      title: '标题',
      areaList,
    },
  },
  {
    label: '级联选择',
    name: 'cascader',
    component: 'Cascader',
    placeholder: '请选择级联选择',
    required: true,
    rules: [{ required: true, message: '请选择级联选择' }],
    componentProps: {
      title: '标题',
      options: [
        {
          text: '浙江省',
          value: '330000',
          children: [{ text: '杭州市', value: '330100' }],
        },
        {
          text: '江苏省',
          value: '320000',
          children: [{ text: '南京市', value: '320100' }],
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
