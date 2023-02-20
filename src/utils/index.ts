export const consoleTag = '[aipage-widget]'; // 输出标记

/**
 * 获取技术栈标识
 * 目的：兼容用户非标准写法
 */
export function getFramework(_framework?: string): string {
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
    case 'vue': // 默认使用 vue 2.0
    case 'vue2':
    case 'vue 2':
    case 'vue2.0':
    case 'vue 2.0':
      curFramework = Framework.vue2;
      break;
    case 'vue3':
    case 'vue 3':
    case 'vue3.0':
    case 'vue 3.0':
      curFramework = Framework.vue3;
      console.error(
        'aipage-widget 不支持 vue3.0 技术栈，请改用aipage-widget支持。',
      );
      break;
    default:
      curFramework = Framework.react;
  }
  return curFramework;
}

/**
 * 当前aipage-widget支持的技术栈
 * 备注：vue2和vue3不能同时存在
 */
export enum Framework {
  react = 'react',
  vue2 = 'vue2',
  vue3 = 'vue3',
  jquery = 'jquery',
}

// 判断是否缺失editor插件关键字段
export function isEditorPlugin(EditorPlugin: any) {
  let _isEditorPlugin = false;
  if (!EditorPlugin || !isObject(EditorPlugin)) {
    return false;
  }
  const _editorPluginObj = EditorPlugin;

  if (!_editorPluginObj.name) {
    console.error(
      `${consoleTag}自定义插件注册失败，插件名称（name）不能为空。`,
    );
  } else if (!_editorPluginObj.id) {
    console.error(`${consoleTag}自定义插件注册失败，插件ID（id）不能为空。`);
  } else if (!_editorPluginObj.componentId) {
    console.error(
      `${consoleTag}自定义插件注册失败，渲染器ID（componentId）不能为空。`,
    );
  } else if (!_editorPluginObj.description) {
    console.error(
      `${consoleTag}自定义插件注册失败，插件描述（description）不能为空。`,
    );
  } else if (
    !_editorPluginObj.tags ||
    (Array.isArray(_editorPluginObj.tags) && _editorPluginObj.tags.length === 0)
  ) {
    console.error(
      `${consoleTag}自定义插件注册失败，插件分类（tags）不能为空。`,
    );
  } else {
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
export function deepClone(target: any): any {
  let newObj;
  if (typeof target === 'object') {
    if (Array.isArray(target)) {
      newObj = [];
      for (let item in target) {
        newObj.push(deepClone(target[item]));
      }
    } else if (target === null) {
      newObj = null;
    } else if (target.constructor === RegExp) {
      newObj = target;
    } else {
      newObj = {};
      for (let item in target) {
        newObj[item] = deepClone(target[item]);
      }
    }
  } else {
    newObj = target;
  }
  return newObj;
}

// 判断是否是字符串类型
export function isString(str: any): boolean {
  return Object.prototype.toString.call(str).slice(8, -1) === 'String';
}

/**
 *  判断是否是对象类型
 * */
export function isObject(curObj: any) {
  let isObject = false;
  if (Object.prototype.toString.call(curObj).slice(8, -1) === 'Object') {
    isObject = true;
  }
  return isObject;
}

// 判断字符串或数字是否数字格式
export function isNumberFormat(val: string | number) {
  return parseFloat(String(val)).toString() !== 'NaN';
}

export interface PlainObject {
  [propsName: string]: any;
}

/**
 * 命名转驼峰命名
 *
 * @param {string} str 任意字符串
 * @return {string} 驼峰命名
 */
export function kebabToCamel(str: string) {
  return str.replace(/-[a-z]/g, (item) => item[1].toUpperCase());
}

export function camelToKebab(str: string) {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

// 转换小程序组件名
export function transformComponentId(str: string) {
  return `-${str}`.replace(/(-[A-Za-z0-9])/g, (m) => {
    return m.toUpperCase().replace('-', '');
  });
}

export function cloneObject(target: any, persistOwnProps: boolean = true) {
  const obj =
    target && target.__super
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

export function extendObject(
  target: any,
  src?: any,
  persistOwnProps: boolean = true,
) {
  const obj = cloneObject(target, persistOwnProps);
  src && Object.keys(src).forEach((key) => (obj[key] = src[key]));
  return obj;
}
