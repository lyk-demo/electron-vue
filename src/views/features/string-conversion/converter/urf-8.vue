<script lang="ts">
import mixins from 'vue-typed-mixins';
import Base from './base';

export default mixins(Base).extend({
  name: 'Utf8',
  computed: {
    value: {
      get(): string {
        return this.textToUtf8(this.text);
      },
      set(val: string) {
        this.utf8ToText(val);
      },
    },
  },
  data() {
    return {
      name: 'utf-8',
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
      this.isError = false;
      try {
        let codeList: number[] = JSON.parse(utf8);
        let code = codeList.map(item => '%' + item.toString(16)).join('');
        let text = decodeURIComponent(code);
        this.$emit('update:text', text);
      } catch (error) {
        this.isError = true;
        global.console.error(error);
      }
    },
  },
});
</script>

<style lang="less" scoped src="./base.less"></style>
