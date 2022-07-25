/**
 * @file 通用方法
 * @author zhangzhuobin@baidu.com
 */
import { CSSProperties } from 'react';
import { PlainObject } from './';
export declare const parseThemeColor: (color: string) => string;
export declare function getLegacyHref(path: string): string;
export declare function toRpx(size: number): string | undefined;
export declare function toPx(size: number): string | undefined;
export declare function getBackgroundStyle(background?: PlainObject): Pick<PlainObject, "backgroundImage" | "backgroundRepeat" | "backgroundSize" | "backgroundPosition" | "backgroundColor">;
/**
 * 获取主题色样式
 *
 * @param {Object} theme 主题配置
 * @param {string} type 主题类型 primary | secondary | muted | default 四种
 * @param {boolean} inverse 是否使用反相
 * @return {Object} 样式
 */
export declare function getThemeStyle(theme: PlainObject | undefined, type: string, inverse: boolean): PlainObject;
export declare function getFontStyle(rawFont?: PlainObject): PlainObject;
export declare function getBoxStyle(box?: PlainObject): PlainObject;
export declare function getFlexStyle(style?: PlainObject): PlainObject;
export declare function toWHset(style: any, label: string): any;
export declare function getBoxPosition(component: any): PlainObject;
export declare function getImageSize(ratio: number): {
    paddingTop: string;
};
export declare function getBoxShadow(config?: PlainObject): {
    boxShadow?: undefined;
} | {
    boxShadow: string;
};
export declare function getBorderRadius(box?: PlainObject): PlainObject;
export declare function getVideoThumbnail(value?: string): string;
export declare function getAlignModeStyle(alignMode: string): {
    top: string | number;
    bottom: string | number;
    left: string | number;
    right: string | number;
};
export declare function dateFormat(source: string | number | Date, pattern: string): string;
/**
 * @desc 获取日期是当年的第几周
 *
 * @param bool sunday 每一周是否从周日开始
 */
export declare function getWeek(day: Date, sunday?: boolean): number;
export declare function makeClassnames(ns?: string): (...classes: string[]) => string;
export declare function isValidCSS(rule: string, val: string): boolean;
export declare function getClasses(props: PlainObject): PlainObject;
export declare function transformStyle(style?: {
    [prop: string]: any;
}): PlainObject;
export declare function getZIndexStyle(zIndex?: string | number): CSSProperties;
export declare const isMobile: any;
