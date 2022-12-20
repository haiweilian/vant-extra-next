<template>
  <vae-form @register="register">
    <div style="margin: 30px 30px 0">
      <van-space>
        <van-button type="success" @click="actions.resetValues()">
          重置表单值
        </van-button>
        <van-button type="success" @click="actions.removeSchemaByName(['sex'])">
          删除性别
        </van-button>
        <van-button type="success" @click="actions.resetSchema(schemas)">
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
import { useForm, type FormSchema } from 'vant-extra-next'

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
    component: 'PickerSingle',
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

const [register, actions] = useForm({
  schemas,
  colon: true,
})

const onSubmit = async () => {
  try {
    const values = await actions.validate()
    console.log('values', values)
  } catch (errors) {
    console.log('errors', errors)
  }
}
</script>
