<template>
  <van-cell-group>
    <van-cell v-for="i in 3" :key="i">
      <vae-descriptions size="small" label-class="label-style">
        <template #title>
          <span>用户信息</span>
          <van-icon name="guide-o" />
        </template>
        <template #extra>
          <van-icon name="setting-o" />
        </template>
        <vae-descriptions-item label="名字">连少</vae-descriptions-item>
        <vae-descriptions-item label="电话">18100000000</vae-descriptions-item>
        <vae-descriptions-item label="性别">男</vae-descriptions-item>
        <vae-descriptions-item label="年龄">18岁</vae-descriptions-item>
        <vae-descriptions-item>
          <template #label>
            <van-icon name="location-o" />
            <span>地址</span>
          </template>
          北京市东城区北京市东城区北京市东城区北京市东城区北京市东城区
        </vae-descriptions-item>
      </vae-descriptions>
    </van-cell>
  </van-cell-group>
</template>

<style>
.label-style {
  width: 80px;
  text-align: right;
}
</style>
