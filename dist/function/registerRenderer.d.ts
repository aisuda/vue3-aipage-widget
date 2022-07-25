/**
 * 注册自定义组件配置项
 */
export interface RendererOption {
    /**
     * 渲染器名称
     * 备注：渲染过程中用于查找对应的渲染器
     */
    type: string;
    /**
     * 自定义组件技术栈类型
     * 备注：默认为react
     */
    framework?: string;
}
/**
 * registerRenderer: 注册一个aipage-editor自定义渲染器
 *【方法参数说明】
 * newRenderer: 新的渲染器,
 * rendererOption: {
 *   type: 渲染器的type类型，比如：input、text-area、select-user等
 *   framework?: 技术栈类型，默认为 react 技术栈，可选技术栈：vue2、react
 * }
 * 备注：暂不支持 jquery 技术栈
 */
export declare function registerRenderer(newRenderer: any, rendererOption: string | RendererOption): void;
