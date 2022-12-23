<template>
  <van-field
    v-model="fieldValue"
    is-link
    readonly
    label="城市"
    placeholder="选择城市"
    @click="showChecker = true"
  />
  <van-popup v-model:show="showChecker" round position="bottom">
    <vae-checker
      title="选择城市"
      multiple
      :columns="columns"
      @cancel="showChecker = false"
      @confirm="onConfirm"
    />
  </van-popup>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { CheckerColumn, CheckerConfirmEventParams } from 'vant-extra-next'

const fieldValue = ref('')
const showChecker = ref(false)
const columns = ref<CheckerColumn>([
  { text: '杭州', value: 'Hangzhou' },
  { text: '宁波', value: 'Ningbo' },
  { text: '温州', value: 'Wenzhou' },
  { text: '绍兴', value: 'Shaoxing' },
  { text: '湖州', value: 'Huzhou' },
  { text: '北京', value: 'BeiJing' },
  { text: '上海', value: 'ShangHai' },
])

const onConfirm = ({
  selectedValues,
  selectedOptions,
}: CheckerConfirmEventParams) => {
  showChecker.value = false
  fieldValue.value = selectedOptions.map((option) => option?.text).join('/')
  console.log('onConfirm', selectedValues, selectedOptions)
}
</script>
