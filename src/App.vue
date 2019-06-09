<template>
  <div id="app">
    <el-container>
      <el-header></el-header>
      <el-container>
        <el-aside width="200px">
          <custom-aside/>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CustomAside from './views/aside'
export default {
  name: 'App',
  components: {
    CustomAside
  }
}
</script>

<style lang="less">
</style>
