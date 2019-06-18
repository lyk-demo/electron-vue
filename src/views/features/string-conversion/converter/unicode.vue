<script lang="ts">
import mixins from 'vue-typed-mixins';
import Base from './base';

export default mixins(Base).extend({
  name: 'Unicode',
  computed: {
    value: {
      get(): string {
        console.info(this.isError, this.val, this.text);
        return this.isError ? this.val : this.textToUnicode(this.text);
      },
      set(val: string) {
        this.val = val;
        console.info(val);
        this.unicodeToText(val);
      },
    },
  },
  data() {
    return {
      name: 'unicode',
    };
  },
  methods: {
    textToUnicode(text: string) {
      let unicode = Object.values(text).reduce(
        (str, code) =>
          str +
          '\\u' +
          code
            .charCodeAt(0)
            .toString(16)
            .padStart(4, '0'),
        '',
      );
      return unicode;
    },
    unicodeToText(unicode: string) {
      this.isError = false;
      try {
        let text = new Function(`return '${unicode}'`)();
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
