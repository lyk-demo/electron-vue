<template>
  <el-menu
    default-active="/PictureToBase64"
    :router="true"
    :collapse="isCollapse"
    @select="handleSelect"
  >
    <el-menu-item index="/PictureToBase64">
      <i class="el-icon-picture" />
      <span slot="title">图片转base64</span>
    </el-menu-item>
    <el-menu-item index="/StringConversion">
      <i class="el-icon-menu" />
      <span slot="title">字符串转码</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'Aside',
  data() {
    return { isCollapse: false };
  },
  methods: {
    handleSelect(key, keyPath) {},
  },
};
</script>

<style lang="less" scoped></style>
