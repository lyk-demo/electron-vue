declare module '*.vue' {
  import Vue from 'vue';
  export interface PluginObject {}
  export default Vue;
}

declare module 'element-ui/lib/locale/lang/en';
declare module 'element-ui/lib/locale/lang/zh-CN';
declare module 'mime-types';
// declare module 'fs';
// declare module 'buffer';

type PluginFunction<T> = (Vue: any, options?: T) => void;

interface PluginObject<T> {
  install: PluginFunction<T>;
  [key: string]: any;
}
