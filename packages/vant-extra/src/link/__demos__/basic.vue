<template>
  <van-space fill wrap :size="10">
    <vae-link>默认链接</vae-link>
    <vae-link type="default">默认链接</vae-link>
    <vae-link type="primary">主要链接</vae-link>
    <vae-link type="success">成功链接</vae-link>
    <vae-link type="warning">警告链接</vae-link>
    <vae-link type="danger">危险链接</vae-link>
  </van-space>

  <van-space fill wrap :size="10">
    <vae-link disabled>禁用默认链接</vae-link>
    <vae-link type="default" disabled>禁用默认链接</vae-link>
    <vae-link type="primary" disabled>禁用主要链接</vae-link>
    <vae-link type="success" disabled>禁用成功链接</vae-link>
    <vae-link type="warning" disabled>禁用警告链接</vae-link>
    <vae-link type="danger" disabled>禁用危险链接</vae-link>
  </van-space>

  <van-space fill wrap :size="10">
    <vae-link
      type="primary"
      href="https://vant-contrib.gitee.io/vant/"
      target="_blank"
    >
      href 链接
    </vae-link>
    <vae-link type="primary" to="/">router-link 链接</vae-link>
  </van-space>

  <van-space fill wrap :size="10">
    <vae-link type="primary">下划线始终显示</vae-link>
    <vae-link type="primary" underline="hover">下划线悬停显示</vae-link>
    <vae-link type="primary" underline="none">下划线不显示</vae-link>
  </van-space>

  <van-space fill wrap :size="10">
    <vae-link text-color="#009688">自定义颜色</vae-link>
    <vae-link text-color="#ab47bc">自定义颜色</vae-link>
  </van-space>

  <van-space fill wrap :size="10">
    <vae-link text-color="#009688" text-size="16">自定义大小</vae-link>
    <vae-link text-color="#ab47bc" text-size="16">自定义大小</vae-link>
  </van-space>
</template>
