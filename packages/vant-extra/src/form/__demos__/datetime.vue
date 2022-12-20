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
import dayjs from 'dayjs'
import { reactive } from 'vue'
import type { FormSchema } from 'vant-extra-next'

const model = reactive({
  calendar: '2022-10-10',
  calendar_2: ['2022-10-10', '2022-10-15'],
  date_picker: '2022-10-10',
  date_picker_2: '2022-10-10',
  time_picker: '12:30:30',
  time_picker_2: '12:30:30',
  date_time_picker: '2022-10-10 12:30:30',
  date_time_picker_2: '2022-10-10 12:30:30',
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
      formatInput(calendars: string[] | undefined) {
        console.log('formatInput calendars', calendars)
        if (!calendars) return
        return calendars.join(' 至 ')
      },
      formatValue(calendars: string[]) {
        console.log('formatValue calendars', calendars)
        return calendars
      },
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
    label: '日期',
    name: 'date_picker_2',
    component: 'DatePicker',
    required: true,
    fieldProps: {
      isLink: true,
      arrowDirection: 'down',
    },
    componentProps: {
      formatInput(dates: string[]) {
        console.log('formatInput dates', dates)
        if (!dates.length) return
        return dayjs(dates.join('-')).format('YYYY年MM月DD日')
      },
      formatValue(dates: string[]) {
        console.log('formatValue dates', dates)
        return dates
      },
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
    label: '时间',
    name: 'time_picker_2',
    component: 'TimePicker',
    required: true,
    fieldProps: {
      isLink: true,
      arrowDirection: 'down',
    },
    componentProps: {
      columnsType: ['hour', 'minute', 'second'],
      formatInput(times: string[]) {
        console.log('formatInput times', times)
        if (!times.length) return
        return dayjs()
          .hour(Number(times[0]))
          .minute(Number(times[1]))
          .second(Number(times[2]))
          .format('HH时mm分ss秒')
      },
      formatValue(times: string[]) {
        console.log('formatValue times', times)
        return times
      },
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
  {
    label: '日期时间',
    name: 'date_time_picker_2',
    component: 'DateTimePicker',
    required: true,
    fieldProps: {
      isLink: true,
      arrowDirection: 'down',
    },
    componentProps: {
      formatInput(datetimes: string[][]) {
        console.log('formatInput datetimes', datetimes)
        if (!datetimes[0].length || !datetimes[1].length) return
        return dayjs(
          `${datetimes[0].join('-')} ${datetimes[1].join(':')}`
        ).format('YYYY年MM月DD日 HH时mm分ss秒')
      },
      formatValue(datetimes: string[][]) {
        console.log('formatValue datetimes', datetimes)
        return datetimes
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
