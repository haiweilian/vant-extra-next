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
import type { FormSchema } from '@bfelib/vant-extra'

const model = reactive({
  calendar: '2022-10-10',
  calendar_2: ['2022-10-10', '2022-10-15'],
  date_picker: '2022-10-10',
  time_picker: '12:30:30',
  date_time_picker: '2022-10-10 12:30:30',
})

const schemas: FormSchema[] = [
  {
    label: '日历',
    name: 'calendar',
    component: 'Calendar',
    required: true,
    fieldProps: {
      isLink: true,
      arrowDirection: 'down',
    },
  },
  {
    label: '范围日历',
    name: 'calendar_2',
    component: 'Calendar',
    required: true,
    fieldProps: {
      isLink: true,
      arrowDirection: 'down',
    },
    componentProps: {
      type: 'range',
    },
  },
  {
    label: '日期',
    name: 'date_picker',
    component: 'DatePicker',
    required: true,
    fieldProps: {
      isLink: true,
      arrowDirection: 'down',
    },
  },
  {
    label: '时间',
    name: 'time_picker',
    component: 'TimePicker',
    required: true,
    fieldProps: {
      isLink: true,
      arrowDirection: 'down',
    },
    componentProps: {
      columnsType: ['hour', 'minute', 'second'],
    },
  },
  {
    label: '日期时间',
    name: 'date_time_picker',
    component: 'DateTimePicker',
    required: true,
    fieldProps: {
      isLink: true,
      arrowDirection: 'down',
    },
    componentProps: {
      // tabs: ['选择日期', '选择时间'],
      // columnsType: ['year', 'month', 'hour', 'minute'],
      // columnsType: ['year', 'month', 'day', 'hour', 'minute', 'second'],
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
