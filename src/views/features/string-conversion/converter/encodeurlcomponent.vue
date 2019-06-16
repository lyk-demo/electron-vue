<script lang="ts">
import mixins from 'vue-typed-mixins';
import Base from './base';

export default mixins(Base).extend({
  name: 'EncodeURIComponent',
  computed: {
    value: {
      get(): string {
        return encodeURIComponent(this.text);
      },
      set(val: string) {
        this.$emit('update:text', decodeURIComponent(val));
      },
    },
  },
  data() {
    return {
      name: 'encodeURIComponent',
    };
  },
});
</script>

<style lang="less" scoped src="./base.less"></style>
