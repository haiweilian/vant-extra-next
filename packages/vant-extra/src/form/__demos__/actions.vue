<template>
  <vae-form ref="formRef" :schemas="schemas" colon>
    <div style="margin: 30px 30px 0">
      <van-space>
        <van-button type="success" @click="formRef?.resetValues()">
          重置表单值
        </van-button>
        <van-button
          type="success"
          @click="formRef?.removeSchemaByName(['sex'])"
        >
          删除性别
        </van-button>
        <van-button type="success" @click="formRef?.resetSchema(schemas)">
          重置表单项
        </van-button>
      </van-space>
    </div>
    <div style="margin: 30px 30px 0">
      <van-button round block type="primary" @click="onSubmit">
        提交
      </van-button>
    </div>
  </vae-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { FormSchema, FormAction } from '@bfelib/vant-extra'

const formRef = ref<FormAction>()
const schemas: FormSchema[] = [
  {
    label: '姓名',
    name: 'name',
    component: 'Field',
    required: true,
  },
  {
    label: '性别',
    name: 'sex',
    component: 'Select',
    isLink: true,
    required: true,
    componentProps: {
      options: [
        { text: '男', value: '1' },
        { text: '女', value: '2' },
        { text: '保密', value: '3' },
      ],
    },
  },
]

const onSubmit = async () => {
  try {
    const values = await formRef.value?.validate()
    console.log('values', values)
  } catch (errors) {
    console.log('errors', errors)
  }
}
</script>
