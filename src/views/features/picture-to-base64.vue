<template>
  <div class="picture-to-base64">
    <el-upload
      class="img-upload"
      drag
      :auto-upload="false"
      :on-change="handleChange"
      :file-list="fileList"
      ref="upload"
      accept="image/*"
      action="a"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
    </el-upload>

    <div class="right-warrper">
      <el-input type="textarea" :rows="8" v-model="base64" />
      <el-button
        @click="clipboard(base64)"
        class="copy-btn"
        :disabled="Boolean(base64) === false"
        type="primary"
      >
        Copy
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { readFile } from 'fs';
import { lookup } from 'mime-types';
import { from } from 'buffer';

type file = {
  raw: {
    path: string;
  };
};

export default {
  name: 'PictureToBase64',
  data() {
    return {
      fileList: [],
      base64: '',
    };
  },
  methods: {
    submitUpload() {},
    handleChange(file: file) {
      this.readFile(file.raw.path);
    },
    readFile(path: string) {
      readFile(path, (err: string, data: string) => {
        if (err) {
          return console.error(err);
        }
        this.base64 = `data:${lookup(path)};base64,${from(data).toString(
          'base64',
        )}`;
      });
    },
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
};
</script>

<style lang="less" scoped>
.picture-to-base64 {
  display: flex;
  .img-upload {
    margin-right: 50px;
  }
  .right-warrper {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .copy-btn {
      flex: 0 0;
      margin-top: 20px;
    }
  }
}
</style>
