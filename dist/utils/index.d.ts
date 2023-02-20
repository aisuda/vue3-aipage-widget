export declare const consoleTag = "[aipage-widget]";
/**
 * 获取技术栈标识
 * 目的：兼容用户非标准写法
 */
export declare function getFramework(_framework?: string): string;
/**
 * 当前aipage-widget支持的技术栈
 * 备注：vue2和vue3不能同时存在
 */
export declare enum Framework {
    react = "react",
    vue2 = "vue2",
    vue3 = "vue3",
    jquery = "jquery"
}
export declare function isEditorPlugin(EditorPlugin: any): boolean;
export declare function deepClone(target: any): any;
export declare function isString(str: any): boolean;
/**
 *  判断是否是对象类型
 * */
export declare function isObject(curObj: any): boolean;
export declare function isNumberFormat(val: string | number): boolean;
export interface PlainObject {
    [propsName: string]: any;
}
/**
 * 命名转驼峰命名
 *
 * @param {string} str 任意字符串
 * @return {string} 驼峰命名
 */
export declare function kebabToCamel(str: string): string;
export declare function camelToKebab(str: string): string;
export declare function transformComponentId(str: string): string;
export declare function cloneObject(target: any, persistOwnProps?: boolean): any;
export declare function extendObject(target: any, src?: any, persistOwnProps?: boolean): any;
