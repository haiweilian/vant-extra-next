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
    select: 'Shaoxing',
    picker: ['Wenzhou'],
    picker_2: ['Friday', 'Morning'],
    picker_3: ['Fujian', 'Fuzhou', 'Gulou'],
  })
})

const schemas: FormSchema[] = [
  {
    label: '下拉选择',
    name: 'select',
    component: 'Select',
    isLink: true,
    required: true,
    componentProps: {
      options: [
        { text: '杭州', value: 'Hangzhou' },
        { text: '宁波', value: 'Ningbo' },
        { text: '温州', value: 'Wenzhou' },
        { text: '绍兴', value: 'Shaoxing' },
        { text: '湖州', value: 'Huzhou' },
      ],
    },
  },
  {
    label: '单列选择器',
    name: 'picker',
    component: 'Picker',
    isLink: true,
    required: true,
    componentProps: {
      options: [
        { text: '杭州', value: 'Hangzhou' },
        { text: '宁波', value: 'Ningbo' },
        { text: '温州', value: 'Wenzhou' },
        { text: '绍兴', value: 'Shaoxing' },
        { text: '湖州', value: 'Huzhou' },
      ],
    },
  },
  {
    label: '多列选择器',
    name: 'picker_2',
    component: 'Picker',
    isLink: true,
    required: true,
    componentProps: {
      columns: [
        [
          { text: '周一', value: 'Monday' },
          { text: '周二', value: 'Tuesday' },
          { text: '周三', value: 'Wednesday' },
          { text: '周四', value: 'Thursday' },
          { text: '周五', value: 'Friday' },
        ],
        [
          { text: '上午', value: 'Morning' },
          { text: '下午', value: 'Afternoon' },
          { text: '晚上', value: 'Evening' },
        ],
      ],
    },
  },
  {
    label: '级联选择器',
    name: 'picker_3',
    component: 'Picker',
    isLink: true,
    required: true,
    componentProps: {
      columns: [
        {
          text: '浙江',
          value: 'Zhejiang',
          children: [
            {
              text: '杭州',
              value: 'Hangzhou',
              children: [
                { text: '西湖区', value: 'Xihu' },
                { text: '余杭区', value: 'Yuhang' },
              ],
            },
            {
              text: '温州',
              value: 'Wenzhou',
              children: [
                { text: '鹿城区', value: 'Lucheng' },
                { text: '瓯海区', value: 'Ouhai' },
              ],
            },
          ],
        },
        {
          text: '福建',
          value: 'Fujian',
          children: [
            {
              text: '福州',
              value: 'Fuzhou',
              children: [
                { text: '鼓楼区', value: 'Gulou' },
                { text: '台江区', value: 'Taijiang' },
              ],
            },
            {
              text: '厦门',
              value: 'Xiamen',
              children: [
                { text: '思明区', value: 'Siming' },
                { text: '海沧区', value: 'Haicang' },
              ],
            },
          ],
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
