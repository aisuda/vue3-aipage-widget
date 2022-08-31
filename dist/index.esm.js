import React from 'react';
import { createApp } from 'vue';
import pick from 'lodash/pick';
import isNumber from 'lodash/isNumber';
import cloneDeep from 'lodash/cloneDeep';
import cx from 'classnames';

const consoleTag = '[vue3-aipage-widget]'; // 输出标记
/**
 * 获取技术栈标识
 * 目的：兼容用户非标准写法
 */
function getFramework(_framework) {
    let defaultFramework = Framework.react;
    if (!_framework) {
        return defaultFramework;
    }
    let curFramework = _framework.toLowerCase().trim();
    switch (curFramework) {
        case 'jquery':
        case 'jq':
            curFramework = Framework.jquery;
            break;
        case 'vue2':
        case 'vue 2':
        case 'vue2.0':
        case 'vue 2.0':
            curFramework = Framework.vue2;
            console.error('vue3-aipage-widget 不支持 vue2.0 技术栈，请改用aipage-widget支持。');
            break;
        case 'vue': // 默认使用 vue 3.0
        case 'vue3':
        case 'vue 3':
        case 'vue3.0':
        case 'vue 3.0':
            curFramework = Framework.vue3;
            break;
        default:
            curFramework = Framework.react;
    }
    return curFramework;
}
/**
 * 当前vue3-aipage-widget支持的技术栈
 * 备注：vue2和vue3不能同时存在
 */
var Framework;
(function (Framework) {
    Framework["react"] = "react";
    Framework["vue2"] = "vue2";
    Framework["vue3"] = "vue3";
    Framework["jquery"] = "jquery";
})(Framework || (Framework = {}));
// 判断是否缺失editor插件关键字段
function isEditorPlugin(EditorPlugin) {
    let _isEditorPlugin = false;
    if (!EditorPlugin || !isObject(EditorPlugin)) {
        return false;
    }
    const _editorPluginObj = EditorPlugin;
    if (!_editorPluginObj.name) {
        console.error(`${consoleTag}自定义插件注册失败，插件名称（name）不能为空。`);
    }
    else if (!_editorPluginObj.id) {
        console.error(`${consoleTag}自定义插件注册失败，插件ID（id）不能为空。`);
    }
    else if (!_editorPluginObj.componentId) {
        console.error(`${consoleTag}自定义插件注册失败，渲染器ID（componentId）不能为空。`);
    }
    else if (!_editorPluginObj.description) {
        console.error(`${consoleTag}自定义插件注册失败，插件描述（description）不能为空。`);
    }
    else if (!_editorPluginObj.tags ||
        (Array.isArray(_editorPluginObj.tags) && _editorPluginObj.tags.length === 0)) {
        console.error(`${consoleTag}自定义插件注册失败，插件分类（tags）不能为空。`);
    }
    else {
        // 1.设置一个默认icon
        if (!_editorPluginObj.pluginIcon) {
            _editorPluginObj.pluginIcon = 'cards-plugin';
        }
        // 2.设置一个默认组件类型
        if (!_editorPluginObj.type) {
            _editorPluginObj.type = 'element';
        }
        _isEditorPlugin = true;
    }
    return _isEditorPlugin;
}
// 深拷贝函数
function deepClone(target) {
    let newObj;
    if (typeof target === 'object') {
        if (Array.isArray(target)) {
            newObj = [];
            for (let item in target) {
                newObj.push(deepClone(target[item]));
            }
        }
        else if (target === null) {
            newObj = null;
        }
        else if (target.constructor === RegExp) {
            newObj = target;
        }
        else {
            newObj = {};
            for (let item in target) {
                newObj[item] = deepClone(target[item]);
            }
        }
    }
    else {
        newObj = target;
    }
    return newObj;
}
// 判断是否是字符串类型
function isString(str) {
    return Object.prototype.toString.call(str).slice(8, -1) === 'String';
}
/**
 *  判断是否是对象类型
 * */
function isObject(curObj) {
    let isObject = false;
    if (Object.prototype.toString.call(curObj).slice(8, -1) === 'Object') {
        isObject = true;
    }
    return isObject;
}
// 判断字符串或数字是否数字格式
function isNumberFormat(val) {
    return parseFloat(String(val)).toString() !== 'NaN';
}
/**
 * 命名转驼峰命名
 *
 * @param {string} str 任意字符串
 * @return {string} 驼峰命名
 */
function kebabToCamel(str) {
    return str.replace(/-[a-z]/g, (item) => item[1].toUpperCase());
}
function camelToKebab(str) {
    return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}
// 转换小程序组件名
function transformComponentId(str) {
    return `-${str}`.replace(/(-[A-Za-z0-9])/g, (m) => {
        return m.toUpperCase().replace('-', '');
    });
}
function cloneObject(target, persistOwnProps = true) {
    const obj = target && target.__super
        ? Object.create(target.__super, {
            __super: {
                value: target.__super,
                writable: false,
                enumerable: false,
            },
        })
        : Object.create(Object.prototype);
    persistOwnProps &&
        target &&
        Object.keys(target).forEach((key) => (obj[key] = target[key]));
    return obj;
}
function extendObject(target, src, persistOwnProps = true) {
    const obj = cloneObject(target, persistOwnProps);
    src && Object.keys(src).forEach((key) => (obj[key] = src[key]));
    return obj;
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
function registerPlugin(newEditorPlugin) {
    if (isEditorPlugin(newEditorPlugin)) {
        // 注册为aipage-editor插件
        // AIPageEditor.registerPlugin(newEditorPlugin); // 可调用 aipage-editor 的 registerPlugin
        // 给 aipage-editor 发一个注册插件的事件
        if (window && window.postMessage) {
            const newComponentId = AddCustomPlugin(newEditorPlugin.id, newEditorPlugin);
            if (newComponentId) {
                console.info(`${consoleTag}触发注册自定义插件(${newEditorPlugin.name})事件:`, newEditorPlugin);
                window.postMessage({
                    type: 'aipage-editor-register-plugin-event',
                    eventMsg: `${consoleTag}注册一个自定义aipage-editor插件`,
                    editorPluginName: newEditorPlugin.name,
                    customEditorPlugin: newEditorPlugin,
                }, '*');
            }
        }
    }
    return newEditorPlugin;
}
function AddCustomPlugin(id, plugin) {
    if (window && !window.AIPageEditorCustomPlugins) {
        window.AIPageEditorCustomPlugins = {};
    }
    const componentId = transformComponentId(id);
    if (!window.AIPageEditorCustomPlugins[componentId]) {
        window.AIPageEditorCustomPlugins[componentId] = plugin;
        return componentId;
    }
    else {
        console.error(`${consoleTag}注册自定义插件失败，已存在同名插件(${id})。`);
    }
    return null;
}

const viewportWidth = 375;
// TODO 主题色处理
const parseThemeColor = function (color) {
    return color;
};
function getLegacyHref(path) {
    const loc = location.pathname.split('/').slice(0, -1);
    loc.push(path);
    return loc.join('/');
}
function toRpx(size) {
    const result = (+[size][size && 0] / 375) * viewportWidth;
    return Number.isNaN(result) ? undefined : `${Math.round(result)}px`;
}
function toPx(size) {
    const screenWidth = viewportWidth;
    const result = (+[size][size && 0] / screenWidth) * 375;
    return Number.isNaN(result) ? undefined : `${Math.round(result)}px`;
}
function getBackgroundStyle(background = {}) {
    const newBackground = pick(cloneDeep(background) || {}, 'backgroundImage', 'backgroundRepeat', 'backgroundSize', 'backgroundPosition', 'backgroundColor');
    if (background.backgroundImage &&
        /linear-gradient/g.test(background.backgroundImage)) {
        newBackground.backgroundImage = background.backgroundImage;
    }
    else {
        if (background.backgroundColor) {
            newBackground.backgroundColor = parseThemeColor(background.backgroundColor);
        }
        if (background.backgroundImage) {
            newBackground.backgroundImage = `url('${background.backgroundImage}')`;
        }
    }
    return newBackground;
}
/**
 * 获取主题色样式
 *
 * @param {Object} theme 主题配置
 * @param {string} type 主题类型 primary | secondary | muted | default 四种
 * @param {boolean} inverse 是否使用反相
 * @return {Object} 样式
 */
function getThemeStyle(theme = {}, type, inverse) {
    const style = {};
    const colorGroup = [theme[`${type}Color`], theme.defaultColor];
    if (type === 'default') {
        colorGroup[0] = theme.inverseColor;
        colorGroup.reverse();
    }
    if (inverse) {
        style.borderColor = colorGroup[0];
        colorGroup.reverse();
    }
    style.backgroundColor = colorGroup[0];
    style.color = colorGroup[1];
    return style;
}
function getFontStyle(rawFont = {}) {
    let font = pick(cloneDeep(rawFont) || {}, 'color', 'fontFamily', 'lineHeight', 'textAlign');
    if (rawFont.bold) {
        font.fontWeight = 'bold';
    }
    if (rawFont.italic) {
        font.fontStyle = 'italic';
    }
    if (rawFont.underline) {
        font.textDecoration = 'underline';
    }
    if (rawFont.lines) {
        font.WebkitLineClamp = `${rawFont.lines}`;
    }
    if (font.lineHeight) {
        font.lineHeight =
            font.lineHeight >= 12
                ? `${parseInt(font.lineHeight, 10)}px`
                : parseInt(font.lineHeight, 10);
    }
    font.fontSize = toRpx(+rawFont.fontSize);
    font.letterSpacing = toRpx(+rawFont.letterSpacing);
    return font;
}
function getBoxStyle(box = {}) {
    const newBox = pick(cloneDeep(box) || {}, 'borderLeftStyle', 'borderRightStyle', 'borderTopStyle', 'borderBottomStyle', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'borderBottomColor');
    if (+box.borderTopWidth > 0) {
        newBox.borderTopWidth = toRpx(+box.borderTopWidth);
        newBox.borderTopColor = parseThemeColor(box.borderTopColor);
    }
    else {
        delete newBox.borderTopStyle;
    }
    if (+box.borderLeftWidth > 0) {
        newBox.borderLeftWidth = toRpx(+box.borderLeftWidth);
        newBox.borderLeftColor = parseThemeColor(box.borderLeftColor);
    }
    else {
        delete newBox.borderLeftStyle;
    }
    if (+box.borderRightWidth > 0) {
        newBox.borderRightWidth = toRpx(+box.borderRightWidth);
        newBox.borderRightColor = parseThemeColor(box.borderRightColor);
    }
    else {
        delete newBox.borderRightStyle;
    }
    if (+box.borderBottomWidth > 0) {
        newBox.borderBottomWidth = toRpx(+box.borderBottomWidth);
        newBox.borderBottomColor = parseThemeColor(box.borderBottomColor);
    }
    else {
        delete newBox.borderBottomStyle;
    }
    newBox.marginTop = toRpx(+box.marginTop);
    newBox.marginLeft = toRpx(+box.marginLeft);
    newBox.marginRight = toRpx(+box.marginRight);
    newBox.marginBottom = toRpx(+box.marginBottom);
    newBox.paddingTop = toRpx(+box.paddingTop);
    newBox.paddingLeft = toRpx(+box.paddingLeft);
    newBox.paddingRight = toRpx(+box.paddingRight);
    newBox.paddingBottom = toRpx(+box.paddingBottom);
    newBox.borderTopLeftRadius = toRpx(+box.borderTopLeftRadius);
    newBox.borderTopRightRadius = toRpx(+box.borderTopRightRadius);
    newBox.borderBottomLeftRadius = toRpx(+box.borderBottomLeftRadius);
    newBox.borderBottomRightRadius = toRpx(+box.borderBottomRightRadius);
    return newBox;
}
function getFlexStyle(style = {}) {
    let result = {};
    if (style.display) {
        result.display = style.display;
    }
    if (result.display === 'flex') {
        let flexSetting = style.flexSetting || {};
        result.flexDirection = flexSetting.direction || 'row';
        result.alignItems = flexSetting.align || 'stretch';
        result.justifyContent = flexSetting.justify || 'flex-start';
    }
    if (style.flexSetting?.flexShrink >= 0) {
        result.flexShrink = +style.flexSetting.flexShrink;
    }
    if (style.flexSetting?.flex >= 0) {
        result.flex = +style.flexSetting.flex;
    }
    return result;
}
function toWHset(style, label) {
    const unit = style[label + 'Unit'] || 'px';
    if (unit === 'auto' || style[label] <= 0) {
        return 'auto';
    }
    else if (unit === 'px') {
        return toRpx(+style[label]);
    }
    return style[label] + unit;
}
function getBoxPosition(component) {
    let { style = {}, isFlow } = component?.componentProperties || {};
    let pos = (style.justification || 'top left').split(' ');
    let result = {};
    if (isFlow) {
        result.height = toWHset(style, 'height');
        result.width = toWHset(style, 'width');
        result.maxWidth = '100%';
        if (result.width > 0) {
            result.flexShrink = 0;
        }
    }
    else {
        result[pos[1]] = +style.x + 'px';
        result[pos[0]] = +style.y + 'px';
        result.height = toWHset(style, 'height');
        result.width = toWHset(style, 'width');
        result.position = 'absolute';
    }
    if (style.opacity >= 0) {
        result.opacity = +style.opacity / 100;
    }
    if (style.display) {
        result.display = style.display;
    }
    return result;
}
function getImageSize(ratio) {
    if (!ratio) {
        ratio = 1;
    }
    const value = `${100 / ratio}%`;
    return { paddingTop: value };
}
function getBoxShadow(config = {}) {
    const { angle = 0, x, y, blur, size, color, distance } = config;
    const shadowX = typeof x !== 'undefined'
        ? x
        : Math.round(Math.sin(angle * (Math.PI / 180)) * distance);
    const shadowY = typeof y !== 'undefined'
        ? y
        : -Math.round(Math.cos(angle * (Math.PI / 180)) * distance);
    // 移除boxshadow
    if (!x && !y && !blur && !size && !distance) {
        return {};
    }
    if (isNumber(shadowX) && isNumber(shadowY)) {
        return {
            boxShadow: `${toRpx(shadowX)} ${toRpx(shadowY)} ${toRpx(blur || 0)} ${toRpx(size || 0)} ${parseThemeColor(color)}`,
        };
    }
    return {};
}
function getBorderRadius(box = {}) {
    const newBox = pick(cloneDeep(box) || {}, 'borderLeftStyle', 'borderRightStyle', 'borderTopStyle', 'borderBottomStyle', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'borderBottomColor');
    newBox.borderTopLeftRadius = toRpx(+box.borderTopLeftRadius);
    newBox.borderTopRightRadius = toRpx(+box.borderTopRightRadius);
    newBox.borderBottomLeftRadius = toRpx(+box.borderBottomLeftRadius);
    newBox.borderBottomRightRadius = toRpx(+box.borderBottomRightRadius);
    return newBox;
}
function getVideoThumbnail(value) {
    if (!value) {
        return '';
    }
    let thumbnail = '';
    let arr = value.split('/');
    if (value.includes('/sites/')) {
        arr.splice(3, 0, 'thumbnails');
    }
    thumbnail = arr.join('/') + '.png';
    return thumbnail;
}
function getAlignModeStyle(alignMode) {
    return {
        top: ~alignMode.indexOf('bottom') ? 'auto' : 0,
        bottom: ~alignMode.indexOf('top') ? 'auto' : 0,
        left: ~alignMode.indexOf('right') ? 'auto' : 0,
        right: ~alignMode.indexOf('left') ? 'auto' : 0,
    };
}
// 时间格式化
function dateFormat(source, pattern) {
    let replacer = function (patternPart, result) {
        pattern = pattern.replace(patternPart, result);
    };
    let pad = function (n) {
        return String(n).length > 1 ? String(n) : `0${n}`;
    };
    let date = new Date(source);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let date2 = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    replacer(/yyyy/g, String(year));
    replacer(/yy/g, pad(year.toString().slice(2)));
    replacer(/MM/g, pad(month));
    replacer(/M/g, month);
    replacer(/dd/g, pad(date2));
    replacer(/d/g, date2);
    replacer(/HH/g, pad(hours));
    replacer(/H/g, hours);
    replacer(/hh/g, pad(hours % 12));
    replacer(/h/g, hours % 12);
    replacer(/mm/g, pad(minutes));
    replacer(/m/g, minutes);
    replacer(/ss/g, pad(seconds));
    replacer(/s/g, seconds);
    return pattern;
}
/**
 * @desc 获取日期是当年的第几周
 *
 * @param bool sunday 每一周是否从周日开始
 */
function getWeek(day, sunday = false) {
    const milliseconds = 24 * 3600000;
    let start = new Date(String(day.getFullYear()) + '/01/01');
    let offset = start.getDay() > 0 ? 8 - start.getDay() : 1;
    offset = sunday ? offset - 1 : offset;
    return Math.abs(Math.ceil((day.getTime() - start.getTime() - offset * milliseconds) /
        milliseconds /
        7));
}
const fns = {};
function makeClassnames(ns) {
    if (ns && fns[ns]) {
        return fns[ns];
    }
    const fn = (...classes) => {
        const str = cx(...classes);
        return str && ns
            ? str
                .replace(/(^|\s)([A-Z])/g, '$1' + ns + '$2')
                .replace(/(^|\s)\:/g, '$1')
            : str || '';
    };
    ns && (fns[ns] = fn);
    return fn;
}
function isValidCSS(rule, val) {
    return CSS.supports(rule, val);
}
// 获取组件的主class和子元素class
function getClasses(props) {
    let { componentProperties = {}, id } = props;
    let style = componentProperties.style || {};
    const root = `node-${id}`;
    let result = {
        root,
        main: `${root} ${style.className || ''}`, // 主组件class以及自定义class
    };
    // style下
    Object.keys(style).forEach((key) => {
        if (!['font', 'box', 'boxShadow', 'background'].includes(key) &&
            isObject(style[key])) {
            result[key] = [`${root}-${camelToKebab(key)}`];
        }
    });
    return result;
}
function transformStyle(style = {}) {
    let result = {};
    Object.keys(style).forEach((key) => {
        switch (key) {
            case 'box':
                result = Object.assign(result, getBoxStyle(style.box));
                break;
            case 'background':
                result = Object.assign(result, getBackgroundStyle(style.background));
                break;
            case 'font':
                result = Object.assign(result, getFontStyle(style.font));
                break;
            case 'lineHeight':
                result.lineHeight =
                    style[key] >= 12
                        ? `${parseInt(style[key], 10)}px`
                        : parseInt(style[key], 10);
                break;
            case 'boxShadow':
                result = Object.assign(result, getBoxShadow(style.boxShadow));
                break;
            case 'opacity':
                result.opacity = +style[key] / 100;
                break;
            case 'width':
                result.width = style.autoWidth ? 'auto' : toWHset(style, 'width');
                break;
            case 'flexSetting':
                result = Object.assign(result, getFlexStyle(style));
                break;
            case 'height':
                result.height = toWHset(style, 'height');
                break;
            default:
                let val = isNumberFormat(style[key]) ? `${+style[key]}px` : style[key];
                if (isObject(style[key])) {
                    result = Object.assign(result, { [key]: transformStyle(style[key]) });
                }
                else if (![
                    'x',
                    'y',
                    'css',
                    'lineClamp',
                    'columns',
                    'flex',
                    'scrollX',
                ].includes(key) &&
                    isValidCSS(camelToKebab(key), val)) {
                    result[key] = isNumberFormat(style[key])
                        ? `${+style[key]}px`
                        : style[key];
                }
                break;
        }
    });
    return result;
}
function getZIndexStyle(zIndex) {
    const style = {};
    if (zIndex !== undefined) {
        style.zIndex = +zIndex;
    }
    return style;
}
const isMobile = window.matchMedia?.('(max-width: 768px)').matches;

/**
 * @file 自定义组件所需的 vue3.0 对接
 */
function createVue3Component(vueObj) {
    if (!vueObj || (typeof vueObj !== 'function' && typeof vueObj !== 'object')) {
        return;
    }
    class VueFactory extends React.Component {
        domRef;
        app;
        vm;
        isUnmount;
        constructor(props) {
            super(props);
            this.domRef = React.createRef();
            this.resolveAmisProps = this.resolveAmisProps.bind(this);
        }
        componentDidMount() {
            const { amisData, amisFunc } = this.resolveAmisProps();
            const { data, ...rest } = (vueObj =
                typeof vueObj === 'function' ? new vueObj() : vueObj);
            // 传入的Vue属性
            this.app = createApp({
                data: () => extendObject(amisData, typeof data === 'function' ? data() : data),
                ...rest,
                props: rest.props || {},
            });
            Object.keys(amisFunc).forEach((key) => {
                this.app.$props[key] = amisFunc[key];
            });
            this.vm = this.app.mount(this.domRef.current);
            this.domRef.current.setAttribute('data-component-id', this.props.id);
        }
        componentDidUpdate() {
            if (!this.isUnmount) {
                const { amisData } = this.resolveAmisProps();
                if (this.vm) {
                    // this.vm.$data.props = amisData; // 此方法无效
                    Object.keys(amisData).forEach((key) => {
                        this.vm[key] = amisData[key];
                    });
                }
            }
        }
        componentWillUnmount() {
            this.isUnmount = true;
            this.app.unmount();
        }
        resolveAmisProps() {
            let amisFunc = {};
            let amisData = {};
            Object.keys(this.props).forEach((key) => {
                const value = this.props[key];
                if (typeof value === 'function') {
                    amisFunc[key] = value;
                }
                else {
                    amisData[key] = value;
                }
            });
            return { amisData, amisFunc };
        }
        render() {
            const { componentProperties, node } = this.props;
            const style = componentProperties && componentProperties.style ? componentProperties.style : {};
            const curStyle = {
                ...getBoxPosition(node || this.props),
                ...transformStyle(style),
            };
            return React.createElement("div", { ref: this.domRef, style: curStyle });
        }
    }
    return VueFactory;
}

/**
 * registerRenderer: 注册一个aipage-editor自定义渲染器
 *【方法参数说明】
 * newRenderer: 新的渲染器,
 * rendererOption: {
 *   type: 渲染器的type类型，比如：input、text-area、select-user等
 *   framework?: 技术栈类型，默认为 react 技术栈，可选技术栈：vue3、react
 * }
 * 备注：暂不支持 jquery 技术栈
 */
function registerRenderer(newRenderer, rendererOption) {
    if (!newRenderer) {
        return;
    }
    // 1.默认注册配置参数
    const curRendererOption = {
        type: '',
        framework: Framework.react, // 默认为 react 技术栈
    };
    // 2.获取相关配置参数
    if (rendererOption && isString(rendererOption)) {
        // rendererOption为字符串则将其设置为type
        Object.assign(curRendererOption, {
            type: rendererOption,
        });
    }
    else {
        Object.assign(curRendererOption, rendererOption);
    }
    if (curRendererOption && !curRendererOption.type) {
        console.error(`${consoleTag}自定义组件注册失败，自定义组件类型（type）不能为空。`);
    }
    else {
        // 修正framework数值
        curRendererOption.framework = getFramework(curRendererOption.framework);
        // 当前支持的技术栈类型
        const resolverMap = {
            react: (i) => i,
            // vue2: createVue2Component,
            vue3: createVue3Component,
        };
        // 支持多技术栈
        const curRendererComponent = resolverMap[curRendererOption.framework](newRenderer);
        // 注册aipage-editor渲染器
        // AIPageEditor.registerRenderer({type: curRendererOption.type, component: curRendererComponent}); // 可调用 aipage-editor 的 registerRenderer
        // 给 aipage-editor 发一个注册插件的事件
        if (window) {
            const newComponentId = AddCustomRenderer(curRendererOption.type, curRendererComponent);
            if (newComponentId) {
                console.info(`${consoleTag}触发注册自定义渲染器(${curRendererOption.type})事件:`, {
                    type: curRendererOption.type,
                    component: curRendererComponent,
                    framework: curRendererOption.framework,
                });
                window.postMessage({
                    type: 'aipage-editor-register-renderer-event',
                    eventMsg: `${consoleTag}注册一个自定义aipage-editor渲染器`,
                    customComponentId: newComponentId,
                }, '*');
            }
        }
    }
}
function AddCustomRenderer(type, component) {
    if (window && !window.AIPageEditorCustomRenderers) {
        window.AIPageEditorCustomRenderers = {};
    }
    const componentId = transformComponentId(type);
    if (!window.AIPageEditorCustomRenderers[componentId]) {
        window.AIPageEditorCustomRenderers[componentId] = component;
        return componentId;
    }
    else {
        console.error(`${consoleTag}注册自定义渲染器失败，已存在同名渲染器类型(${type})。`);
    }
    return null;
}

export { Framework, camelToKebab, cloneObject, consoleTag, createVue3Component, dateFormat, deepClone, extendObject, getAlignModeStyle, getBackgroundStyle, getBorderRadius, getBoxPosition, getBoxShadow, getBoxStyle, getClasses, getFlexStyle, getFontStyle, getFramework, getImageSize, getLegacyHref, getThemeStyle, getVideoThumbnail, getWeek, getZIndexStyle, isEditorPlugin, isMobile, isNumberFormat, isObject, isString, isValidCSS, kebabToCamel, makeClassnames, parseThemeColor, registerPlugin, registerRenderer, toPx, toRpx, toWHset, transformComponentId, transformStyle };
