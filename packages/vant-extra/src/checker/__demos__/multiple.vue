<template>
  <vae-checker
    v-model="selected"
    title="基础多选"
    multiple
    :columns="columns"
    @confirm="onConfirm"
    @cancel="onCancel"
    @change="onChange"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { showToast } from 'vant'
import type { CheckerColumn, CheckerConfirmEventParams } from 'vant-extra-next'

const selected = ref([])
const columns = ref<CheckerColumn>([
  { text: '杭州', value: 'Hangzhou' },
  { text: '宁波', value: 'Ningbo' },
  { text: '温州', value: 'Wenzhou' },
  { text: '绍兴', value: 'Shaoxing' },
  { text: '湖州', value: 'Huzhou' },
])

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
