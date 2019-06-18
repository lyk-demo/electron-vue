<script lang="ts">
import mixins from 'vue-typed-mixins';
import Base from './base';

export default mixins(Base).extend({
  name: 'Utf8',
  computed: {
    value: {
      get(): string {
        this.isError = false;
        return this.isError ? this.val : this.stringToBytes(this.text);
      },
      set(val: string) {
        this.val = val;
        this.isError = false;
        try {
          let codeList: number[] = val.split(',').map(code => {
            const n = parseInt(code);
            if (Number.isNaN(n)) {
              throw 'isNaN';
            } else {
              return n;
            }
          });

          let text = this.byteToString(codeList);
          this.$emit('update:text', text);
        } catch (error) {
          this.isError = true;
        }
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
      this.isError = false;
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
    stringToBytes(str: string) {
      var bytes = new Array();
      var len, c;
      len = str.length;
      for (var i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if (c >= 0x010000 && c <= 0x10ffff) {
          bytes.push(((c >> 18) & 0x07) | 0xf0);
          bytes.push(((c >> 12) & 0x3f) | 0x80);
          bytes.push(((c >> 6) & 0x3f) | 0x80);
          bytes.push((c & 0x3f) | 0x80);
        } else if (c >= 0x000800 && c <= 0x00ffff) {
          bytes.push(((c >> 12) & 0x0f) | 0xe0);
          bytes.push(((c >> 6) & 0x3f) | 0x80);
          bytes.push((c & 0x3f) | 0x80);
        } else if (c >= 0x000080 && c <= 0x0007ff) {
          bytes.push(((c >> 6) & 0x1f) | 0xc0);
          bytes.push((c & 0x3f) | 0x80);
        } else {
          bytes.push(c & 0xff);
        }
      }
      return bytes.join();
    },
    byteToString(byte: number[] | string): string {
      if (typeof byte === 'string') {
        return byte;
      }
      var str = '',
        _arr = byte;
      for (var i = 0; i < _arr.length; i++) {
        var one = _arr[i].toString(2),
          v = one.match(/^1+?(?=0)/);
        if (v && one.length == 8) {
          var bytesLength = v[0].length;
          var store = _arr[i].toString(2).slice(7 - bytesLength);
          for (var st = 1; st < bytesLength; st++) {
            store += _arr[st + i].toString(2).slice(2);
          }
          str += String.fromCharCode(parseInt(store, 2));
          i += bytesLength - 1;
        } else {
          str += String.fromCharCode(_arr[i]);
        }
      }
      return str;
    },
  },
});
</script>

<style lang="less" scoped src="./base.less"></style>
