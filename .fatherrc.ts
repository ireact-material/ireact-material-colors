import { defineConfig } from 'father';

export default defineConfig({
  // 指定构建产物的目标平台
  platform: 'browser',
  // 配置将源码转换为 ESModule/CommonJS 产物
  esm: { output: 'es' },
  // 配置将源码转换为 ESModule/CommonJS 产物
  cjs: { output: 'lib' },
});
