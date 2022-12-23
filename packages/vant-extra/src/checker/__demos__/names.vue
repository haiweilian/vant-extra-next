<template>
  <vae-checker
    v-model="selected"
    title="自定义结构"
    :columns="columns"
    :columns-field-names="customFieldName"
    @confirm="onConfirm"
    @cancel="onCancel"
    @change="onChange"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { showToast } from 'vant'
import type { CheckerColumn, CheckerConfirmEventParams } from 'vant-extra-next'

const selected = ref(['Ningbo'])
const columns = ref<CheckerColumn>([
  { cityName: '杭州', cityValue: 'Hangzhou' },
  { cityName: '宁波', cityValue: 'Ningbo' },
  { cityName: '温州', cityValue: 'Wenzhou' },
  { cityName: '绍兴', cityValue: 'Shaoxing' },
  { cityName: '湖州', cityValue: 'Huzhou' },
])
const customFieldName = {
  text: 'cityName',
  value: 'cityValue',
}

const onConfirm = ({
  selectedValues,
  selectedOptions,
}: CheckerConfirmEventParams) => {
  showToast(`当前值: ${selectedValues.join(',')}`)
  console.log('onConfirm', selectedValues, selectedOptions)
}
const onChange = ({
  selectedValues,
  selectedOptions,
}: CheckerConfirmEventParams) => {
  showToast(`当前值: ${selectedValues.join(',')}`)
  console.log('onChange', selectedValues, selectedOptions)
}
const onCancel = () => {
  showToast('取消')
}
</script>
