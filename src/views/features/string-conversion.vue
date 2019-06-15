<template>
  <div class="string-conversion">
    <el-input v-model="text" />
    <el-input v-model="utf8" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'StringConversion',
  computed: {
    utf8: {
      get(): string {
        return this.text;
      },
      set(val: string) {
        this.text = val;
      },
    },
  },
  data() {
    let a: string = '';
    return {
      text: '',
    };
  },
  methods: {},
});
</script>

<style lang="less" scoped>
// .string-conversion {
// }
</style>
