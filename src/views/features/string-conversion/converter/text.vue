<script lang="ts">
import mixins from 'vue-typed-mixins';
import Base from './base';

export default mixins(Base).extend({
  name: 'MyText',
  computed: {
    value: {
      get(): string {
        return this.text;
      },
      set(val: string) {
        this.$emit('update:text', val);
      },
    },
  },
  data() {
    return {
      name: 'text',
    };
  },
});
</script>

<style lang="less" scoped src="./base.less"></style>
