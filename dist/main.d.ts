/**
 * vue3-aipage-widget: 自定义组件注册器（支持vue3.0）
 *
 * 【提供的工具方法清单】
 * registerRenderer: 注册 aipage-editor 自定义组件（补充自定义渲染器）
 * registerPlugin: 注册 aipage-editor 自定义插件（组件物料面板中展示）
 */
export { registerPlugin } from './function/registerPlugin';
export { registerRenderer } from './function/registerRenderer';
export * from './utils/style';
export * from './utils/index';
