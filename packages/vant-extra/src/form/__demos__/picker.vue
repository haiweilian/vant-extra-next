<template>
  <vae-form
    v-model="model"
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
import { reactive } from 'vue'
import type { PickerOption } from 'vant'
import type { FormSchema } from 'vant-extra-next'

const model = reactive({
  select: 'Shaoxing',
  picker: ['Wenzhou'],
  picker_2: ['Friday', 'Morning'],
  picker_3: ['Fujian', 'Fuzhou', 'Gulou'],
})

const schemas: FormSchema[] = [
  {
    label: '单选选择器',
    name: 'select',
    component: 'PickerSingle',
    required: true,
    fieldProps: {
      isLink: true,
      arrowDirection: 'down',
    },
    componentProps: {
      options: [
        { text: '杭州', value: 'Hangzhou' },
        { text: '宁波', value: 'Ningbo' },
        { text: '温州', value: 'Wenzhou' },
        { text: '绍兴', value: 'Shaoxing' },
        { text: '湖州', value: 'Huzhou' },
      ],
      // formatInput(option: PickerOption | undefined) {
      //   console.log('formatInput option', option)
      //   if (!option) return option
      //   return `${option.text}:${option.value}`
      // },
      // formatValue(value: string | undefined) {
      //   console.log('formatValue value', value)
      //   return value
      // },
    },
  },
  {
    label: '单列选择器',
    name: 'picker',
    component: 'Picker',
    required: true,
    fieldProps: {
      isLink: true,
      arrowDirection: 'down',
    },
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
    required: true,
    fieldProps: {
      isLink: true,
      arrowDirection: 'down',
    },
    componentProps: {
      options: [
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
    required: true,
    fieldProps: {
      isLink: true,
      arrowDirection: 'down',
    },
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
      formatInput(options: PickerOption[]) {
        console.log('formatInput options', options)
        return options.map((option) => option.text).join('-')
      },
      formatValue(values: string[]) {
        console.log('formatValue values', values)
        return values
      },
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
