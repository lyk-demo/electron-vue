import Vue from 'vue';

export default Vue.extend({
  props: {
    // value: {
    //   type: String,
    //   default: '',
    // },
    text: {
      type: String,
      default: '',
    },
  },
  computed: {
    value(): string {
      return '';
    },
  },
  data() {
    return {
      name: '',
      isError: false,
      val: '',
    };
  },
  methods: {
    getContainer() {
      var $copy: HTMLInputElement = document.getElementById(
        '$XECopy',
      ) as HTMLInputElement;
      if (!$copy) {
        $copy = document.createElement('input');
        $copy.id = '$XECopy';
        $copy.style['width'] = '48px';
        $copy.style['height'] = '12px';
        $copy.style['position'] = 'fixed';
        $copy.style.zIndex = '0';
        $copy.style['left'] = '-500px';
        $copy.style['top'] = '-500px';
        document.body.appendChild($copy);
      }
      return $copy;
    },
    clipboard(content: string) {
      var $copy = this.getContainer();
      var value = content === null || content === undefined ? '' : '' + content;
      try {
        $copy.value = value;
        $copy.focus();
        $copy.setSelectionRange(0, value.length);
        this.$notify.success('Copy成功!');
        return document.execCommand('copy', true);
      } catch (e) {
        console.error(e);
      }
      return false;
    },
  },
  render(createElement, hack) {
    let className = this.isError ? 'error' : '';
    return (
      <li class="base">
        <el-tag>{this.name}</el-tag>
        <el-input
          value={this.value}
          class={className}
          onInput={(val: string) => (this.value = val)}
        />
        <el-button
          title="Copy"
          icon="el-icon-document-copy"
          circle
          onClick={() => this.clipboard(this.value)}
        ></el-button>
      </li>
    );
  },
});
