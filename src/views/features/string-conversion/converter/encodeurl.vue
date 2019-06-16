<script lang="ts">
import mixins from 'vue-typed-mixins';
import Base from './base';

export default mixins(Base).extend({
  name: 'EncodeUrl',
  computed: {
    value: {
      get(): string {
        return encodeURI(this.text);
      },
      set(val: string) {
        this.$emit('update:text', decodeURI(val));
      },
    },
  },
  data() {
    return {
      name: 'encodeURI',
    };
  },
});
</script>

<style lang="less" scoped src="./base.less"></style>
