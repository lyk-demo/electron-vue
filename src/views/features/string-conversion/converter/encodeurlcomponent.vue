<script lang="ts">
import mixins from 'vue-typed-mixins';
import Base from './base';

export default mixins(Base).extend({
  name: 'EncodeURIComponent',
  computed: {
    value: {
      get(): string {
        if (this.isError) {
          return this.val;
        } else {
          this.isError = false;
          return encodeURIComponent(this.text);
        }
      },
      set(val: string) {
        this.isError = false;
        this.val = val;
        try {
          this.$emit('update:text', decodeURIComponent(val));
        } catch (error) {
          this.isError = true;
        }
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
