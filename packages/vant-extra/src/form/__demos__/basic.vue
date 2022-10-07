<template>
  <vae-form :schemas="schemas" @submit="onSubmit" @failed="onFailed">
    <div style="margin: 30px">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </vae-form>
</template>

<script lang="ts" setup>
import { areaList } from '@vant/area-data'
import type { FormSchema } from '@bfelib/vant-extra'
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
  {
    label: '多选框',
    name: 'checkbox',
    component: 'Checkbox',
    placeholder: '请选择多选框',
    required: true,
    rules: [{ required: true, message: '请选择多选框' }],
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
  {
    label: '分割线',
    name: 'divider',
    component: 'Divider',
  },
  {
    label: '输入框',
    name: 'field',
    component: 'Field',
    required: true,
    rules: [{ required: true, message: '请输入内容' }],
    placeholder: '请输入内容',
  },
  {
    label: '文本域',
    name: 'field_2',
    component: 'Field',
    required: true,
    rules: [{ required: true, message: '请输入内容' }],
    placeholder: '请输入内容',
    componentProps: {
      type: 'textarea',
      maxlength: 150,
      showWordLimit: true,
    },
  },
  {
    label: '选择器',
    name: 'picker',
    component: 'Picker',
    required: true,
    rules: [{ required: true, message: '请选择选择器' }],
    placeholder: '请选择选择器',
    componentProps: {
      columns: [
        { text: '杭州', value: 'Hangzhou' },
        { text: '宁波', value: 'Ningbo' },
        { text: '温州', value: 'Wenzhou' },
        { text: '绍兴', value: 'Shaoxing' },
        { text: '湖州', value: 'Huzhou' },
      ],
    },
  },
  {
    label: '单选框',
    name: 'radio',
    component: 'Radio',
    placeholder: '请选择单选框',
    required: true,
    rules: [{ required: true, message: '请选择单选框' }],
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
    label: '评分',
    name: 'rate',
    component: 'Rate',
    placeholder: '请选择评分',
    required: true,
    rules: [
      { required: true, validator: (val) => val > 0, message: '请选择评分' },
    ],
  },
  {
    label: '滑块',
    name: 'slider',
    component: 'Slider',
    placeholder: '请选择滑块',
    required: true,
    rules: [
      { required: true, validator: (val) => val > 0, message: '请选择滑块' },
    ],
  },
  {
    label: '步进器',
    name: 'stepper',
    component: 'Stepper',
    placeholder: '请选择步进器',
    required: true,
    rules: [
      { required: true, validator: (val) => val > 1, message: '请选择步进器' },
    ],
  },
  {
    label: '开关',
    name: 'switch',
    component: 'Switch',
    placeholder: '请选择开关',
    required: true,
    rules: [
      { required: true, validator: (val) => !!val, message: '请选择开关' },
    ],
  },
  {
    label: '上传',
    name: 'uploader',
    component: 'Uploader',
    placeholder: '请上传文件',
    required: true,
    rules: [{ required: true, message: '请上传文件' }],
  },
]

const onSubmit = (values: any) => {
  console.log(values)
}

const onFailed = (errorInfo: any) => {
  console.log('failed', errorInfo)
}
</script>
