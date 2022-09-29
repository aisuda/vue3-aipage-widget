/**
 * 注册自定义插件配置项
 */
export interface PluginOption {
    /**
     * 插件ID（确保唯一）
     * 备注：aipage-editor 以 id 作为 key 值存放插件对象
     */
    id: string;
    /**
     * 渲染器ID（允许重复: 一个渲染器可以有多个插件）
     * 备注：aipage-editor 根据 componentId 查找对应的渲染器
     */
    componentId: string;
    /**
     * 自定义组件名称
     * 在组件物料面板中显示
     */
    name: string;
    /**
     * 自定义组件描述
     * hover自定义组件时展示
     */
    description?: string;
    /**
     * 自定义组件分类
     * 指定当前自定义插件在组件物料面板中哪个分类下展示
     */
    tags?: string | Array<string>;
    /**
     * 自定义组件排序
     * 指定当前自定义插件在「页面设计器」自定义组件面板中的展示次序
     * 数值越小越靠前展示
     */
    order?: number;
    /**
     * 自定义组件icon
     */
    pluginIcon?: string;
    /**
     * 自定义组件支持的设备类型
     * 可指定多个设备可用，当前 aipage-editor 支持的设备类型: pc、mobile、app、quickapp、quickapp-card
     * 设备类型说明:
     * pc: PC桌面端
     * mobile: H5移动端
     * app: 小程序端
     * quickapp: 快应用端
     * quickapp-card: 快应用卡片端
     */
    device: Array<string>;
    /**
     * 自定义组件渲染器类型
     * 备注1: 当前 aipage-editor 支持的渲染器类型: element（普通元素）、section（容器）、list（列表）
     * 备注2: 默认为 element（普通元素）
     * 备注3: 当前仅支持 element 类型
     */
    type?: string;
    /**
     * 自定义组件显隐
     * 备注：设置为true时则不展示
     */
    disabledRendererPlugin?: boolean;
}
/**
 * registerPlugin: 注册 aipage-editor 插件
 *【方法参数说明】
 * _editorPlugin: 新的自定义插件,
 * pluginOption: {
 *   componentId?: 渲染器ID
 *   name?: 自定义组件名称
 *   description?: 自定义组件描述
 *   tags?: 自定义组件分类
 *   order?: 自定义组件排序
 *   pluginIcon?: 自定义组件icon
 *   device: 自定义组件支持的设备类型
 *   disabledRendererPlugin?: 自定义组件显隐
 * }
 */
export declare function registerPlugin(newEditorPlugin: PluginOption): PluginOption;
