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
import type { FormSchema, FormAction } from '@bfelib/vant-extra'

const formRef = ref<FormAction>()
onMounted(() => {
  // console.log(formRef.value)

  formRef.value?.setValues({
    calendar: '2022-10-08',
    calendar_2: ['2022-10-08', '2022-10-15'],
    date_picker: ['2022', '10', '08'],
    time_picker: ['12', '00'],
  })
})

const schemas: FormSchema[] = [
  {
    label: '日历',
    name: 'calendar',
    component: 'Calendar',
    placeholder: '请选择日历',
    required: true,
    rules: [{ required: true, message: '请选择日历' }],
    componentProps: {
      title: '标题',
    },
  },
  {
    label: '范围日历',
    name: 'calendar_2',
    component: 'Calendar',
    placeholder: '请选择范围日历',
    required: true,
    rules: [{ required: true, message: '请选择范围日历' }],
    componentProps: {
      title: '标题',
      type: 'range',
    },
  },
  {
    label: '日期',
    name: 'date_picker',
    component: 'DatePicker',
    placeholder: '请选择日期',
    required: true,
    rules: [{ required: true, message: '请选择日期' }],
  },
  {
    label: '时间',
    name: 'time_picker',
    component: 'TimePicker',
    placeholder: '请选择时间',
    required: true,
    rules: [{ required: true, message: '请选择时间' }],
  },
]

const onSubmit = (values: any) => {
  console.log(values)
}

const onFailed = (errorInfo: any) => {
  console.log('failed', errorInfo)
}
</script>
