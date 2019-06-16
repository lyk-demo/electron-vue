<script lang="ts">
import mixins from 'vue-typed-mixins';
import Base from './base';

export default mixins(Base).extend({
  name: 'Unicode',
  computed: {
    value: {
      get(): string {
        return this.textToUnicode(this.text);
      },
      set(val: string) {
        let text = this.unicodeToText(val);
        this.$emit('update:text', text);
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

<style lang="less" scoped src="./base.less"></style>
