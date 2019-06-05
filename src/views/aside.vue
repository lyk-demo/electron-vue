<template>
  <el-menu default-active="1" :router="true" :collapse="isCollapse" @select="handleSelect">
    <el-menu-item index="PictureToBase64">
      <i class="el-icon-menu"></i>
      <span slot="title">图片转base64</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  data() {
    return { isCollapse: false };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.info(key, keyPath);
    }
  }
};
</script>

<style lang="less" scoped>
</style>

