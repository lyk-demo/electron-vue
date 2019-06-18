<template>
  <div class="string-conversion">
    <ul class="conver-list">
      <my-text :text.sync="text" />
      <utf8 :text.sync="text" />
      <unicode :text.sync="text" />
      <encode-url :text.sync="text" />
      <encode-uri-component :text.sync="text" />
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Unicode from './converter/unicode.vue';
import Utf8 from './converter/urf-8.vue';
import MyText from './converter/text.vue';
import EncodeUrl from './converter/encodeurl.vue';
import EncodeUriComponent from './converter/encodeurlcomponent.vue';

export default Vue.extend({
  name: 'StringConversion',
  components: {
    Unicode,
    Utf8,
    MyText,
    EncodeUrl,
    EncodeUriComponent,
  },
  computed: {
    utf8: {
      get(): string {
        return this.textToUtf8(this.text);
      },
      set(val: string) {
        this.text = this.utf8ToText(val);
      },
    },
    unicode: {
      get(): string {
        return this.textToUnicode(this.text);
      },
      set(val: string) {
        this.text = this.unicodeToText(val);
      },
    },
  },
  data() {
    let a: string = '';
    return {
      text: '',
    };
  },
  methods: {
    textToUtf8(text: string) {
      let code = encodeURIComponent(text);

      let codeList = code
        .split('%')
        .filter(item => item)
        .map(item => parseInt(item, 16));

      return JSON.stringify(codeList);
    },
    utf8ToText(utf8: string) {
      let codeList: number[] = JSON.parse(utf8);
      let code = codeList.map(item => '%' + item.toString(16)).join('');
      return decodeURIComponent(code);
    },
    textToUnicode(text: string) {
      let unicode = Object.values(text).reduce(
        (str, code) => str + '\\u' + code.charCodeAt(0).toString(16),
        '',
      );
      return unicode;
    },
    unicodeToText(unicode: string) {
      return new Function(`return '${unicode}'`)();
    },
  },
});
</script>

<style lang="less" scoped>
.string-conversion {
  .conver-list {
    list-style: none;
    margin: 0;
    padding: 0;
    // li {
    //   display: flex;
    //   align-items: center;
    //   margin-bottom: 20px;
    //   .el-tag {
    //     flex-basis: 100px;
    //     margin-right: 30px;
    //   }
    // }
  }
}
</style>

<style lang="less">
.string-conversion {
  .el-input.error {
    .el-input__inner {
      border-color: #f56c6c;
    }
  }
}
</style>
