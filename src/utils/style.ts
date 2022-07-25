/**
 * @file 通用方法
 * @author zhangzhuobin@baidu.com
 */
import { CSSProperties } from 'react';
import pick from 'lodash/pick';
import isNumber from 'lodash/isNumber';
import cloneDeep from 'lodash/cloneDeep';
import cx from 'classnames';
import { isNumberFormat, PlainObject, isObject, camelToKebab } from './';

const viewportWidth = 375;

// TODO 主题色处理
export const parseThemeColor = function (color: string) {
  return color;
};

export function getLegacyHref(path: string) {
  const loc = location.pathname.split('/').slice(0, -1);
  loc.push(path);
  return loc.join('/');
}

export function toRpx(size: number) {
  const result = (+[size][size && 0] / 375) * viewportWidth;
  return Number.isNaN(result) ? undefined : `${Math.round(result)}px`;
}

export function toPx(size: number) {
  const screenWidth = viewportWidth;
  const result = (+[size][size && 0] / screenWidth) * 375;
  return Number.isNaN(result) ? undefined : `${Math.round(result)}px`;
}

export function getBackgroundStyle(background: PlainObject = {}) {
  const newBackground = pick(
    cloneDeep(background) || {},
    'backgroundImage',
    'backgroundRepeat',
    'backgroundSize',
    'backgroundPosition',
    'backgroundColor',
  );
  if (
    background.backgroundImage &&
    /linear-gradient/g.test(background.backgroundImage)
  ) {
    newBackground.backgroundImage = background.backgroundImage;
  } else {
    if (background.backgroundColor) {
      newBackground.backgroundColor = parseThemeColor(
        background.backgroundColor,
      );
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
export function getThemeStyle(
  theme: PlainObject = {},
  type: string,
  inverse: boolean,
) {
  const style: PlainObject = {};
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

export function getFontStyle(rawFont: PlainObject = {}) {
  let font: PlainObject = pick(
    cloneDeep(rawFont) || {},
    'color',
    'fontFamily',
    'lineHeight',
    'textAlign',
  );

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

export function getBoxStyle(box: PlainObject = {}) {
  const newBox: PlainObject = pick(
    cloneDeep(box) || {},
    'borderLeftStyle',
    'borderRightStyle',
    'borderTopStyle',
    'borderBottomStyle',
    'borderLeftColor',
    'borderRightColor',
    'borderTopColor',
    'borderBottomColor',
  );

  if (+box.borderTopWidth > 0) {
    newBox.borderTopWidth = toRpx(+box.borderTopWidth);
    newBox.borderTopColor = parseThemeColor(box.borderTopColor);
  } else {
    delete newBox.borderTopStyle;
  }

  if (+box.borderLeftWidth > 0) {
    newBox.borderLeftWidth = toRpx(+box.borderLeftWidth);
    newBox.borderLeftColor = parseThemeColor(box.borderLeftColor);
  } else {
    delete newBox.borderLeftStyle;
  }

  if (+box.borderRightWidth > 0) {
    newBox.borderRightWidth = toRpx(+box.borderRightWidth);
    newBox.borderRightColor = parseThemeColor(box.borderRightColor);
  } else {
    delete newBox.borderRightStyle;
  }

  if (+box.borderBottomWidth > 0) {
    newBox.borderBottomWidth = toRpx(+box.borderBottomWidth);
    newBox.borderBottomColor = parseThemeColor(box.borderBottomColor);
  } else {
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

export function getFlexStyle(style: PlainObject = {}) {
  let result: PlainObject = {};

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

export function toWHset(style: any, label: string) {
  const unit = style[label + 'Unit'] || 'px';
  if (unit === 'auto' || style[label] <= 0) {
    return 'auto';
  } else if (unit === 'px') {
    return toRpx(+style[label]);
  }
  return style[label] + unit;
}

export function getBoxPosition(component: any) {
  let { style = {}, isFlow } = component?.componentProperties || {};
  let pos = (style.justification || 'top left').split(' ');
  let result: PlainObject = {};
  if (isFlow) {
    result.height = toWHset(style, 'height');
    result.width = toWHset(style, 'width');
    result.maxWidth = '100%';
    if (result.width > 0) {
      result.flexShrink = 0;
    }
  } else {
    result[pos[1]] = +style.x;
    result[pos[0]] = +style.y;
    result.height = toWHset(style, 'height');
    result.width = toWHset(style, 'width');
  }
  if (style.opacity >= 0) {
    result.opacity = +style.opacity / 100;
  }
  if (style.display) {
    result.display = style.display;
  }
  return result;
}

export function getImageSize(ratio: number) {
  if (!ratio) {
    ratio = 1;
  }
  const value = `${100 / ratio}%`;
  return { paddingTop: value };
}

export function getBoxShadow(config: PlainObject = {}) {
  const { angle = 0, x, y, blur, size, color, distance } = config;
  const shadowX =
    typeof x !== 'undefined'
      ? x
      : Math.round(Math.sin(angle * (Math.PI / 180)) * distance);
  const shadowY =
    typeof y !== 'undefined'
      ? y
      : -Math.round(Math.cos(angle * (Math.PI / 180)) * distance);
  // 移除boxshadow
  if (!x && !y && !blur && !size && !distance) {
    return {};
  }
  if (isNumber(shadowX) && isNumber(shadowY)) {
    return {
      boxShadow: `${toRpx(shadowX)} ${toRpx(shadowY)} ${toRpx(
        blur || 0,
      )} ${toRpx(size || 0)} ${parseThemeColor(color)}`,
    };
  }
  return {};
}

export function getBorderRadius(box: PlainObject = {}) {
  const newBox: PlainObject = pick(
    cloneDeep(box) || {},
    'borderLeftStyle',
    'borderRightStyle',
    'borderTopStyle',
    'borderBottomStyle',
    'borderLeftColor',
    'borderRightColor',
    'borderTopColor',
    'borderBottomColor',
  );

  newBox.borderTopLeftRadius = toRpx(+box.borderTopLeftRadius);
  newBox.borderTopRightRadius = toRpx(+box.borderTopRightRadius);
  newBox.borderBottomLeftRadius = toRpx(+box.borderBottomLeftRadius);
  newBox.borderBottomRightRadius = toRpx(+box.borderBottomRightRadius);
  return newBox;
}
export function getVideoThumbnail(value?: string) {
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

export function getAlignModeStyle(alignMode: string) {
  return {
    top: ~alignMode.indexOf('bottom') ? 'auto' : 0,
    bottom: ~alignMode.indexOf('top') ? 'auto' : 0,
    left: ~alignMode.indexOf('right') ? 'auto' : 0,
    right: ~alignMode.indexOf('left') ? 'auto' : 0,
  };
}

// 时间格式化
export function dateFormat(source: string | number | Date, pattern: string) {
  let replacer = function (patternPart: RegExp, result: any) {
    pattern = pattern.replace(patternPart, result);
  };
  let pad = function (n: string | number) {
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
export function getWeek(day: Date, sunday = false) {
  const milliseconds = 24 * 3600000;
  let start = new Date(String(day.getFullYear()) + '/01/01');
  let offset = start.getDay() > 0 ? 8 - start.getDay() : 1;
  offset = sunday ? offset - 1 : offset;
  return Math.abs(
    Math.ceil(
      (day.getTime() - start.getTime() - offset * milliseconds) /
        milliseconds /
        7,
    ),
  );
}

const fns: {
  [propName: string]: (...classes: string[]) => string;
} = {};

export function makeClassnames(ns?: string) {
  if (ns && fns[ns]) {
    return fns[ns];
  }

  const fn = (...classes: string[]) => {
    const str = cx(...(classes as any));
    return str && ns
      ? str
          .replace(/(^|\s)([A-Z])/g, '$1' + ns + '$2')
          .replace(/(^|\s)\:/g, '$1')
      : str || '';
  };

  ns && (fns[ns] = fn);
  return fn;
}

export function isValidCSS(rule: string, val: string) {
  return CSS.supports(rule, val);
}

// 获取组件的主class和子元素class
export function getClasses(props: PlainObject): PlainObject {
  let { componentProperties = {}, id } = props;
  let style = componentProperties.style || {};
  const root = `node-${id}`;
  let result: PlainObject = {
    root,
    main: `${root} ${style.className || ''}`, // 主组件class以及自定义class
  };

  // style下
  Object.keys(style).forEach((key) => {
    if (
      !['font', 'box', 'boxShadow', 'background'].includes(key) &&
      isObject(style[key])
    ) {
      result[key] = [`${root}-${camelToKebab(key)}`];
    }
  });
  return result;
}

export function transformStyle(style: { [prop: string]: any } = {}) {
  let result: PlainObject = {};
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
        } else if (
          ![
            'x',
            'y',
            'css',
            'lineClamp',
            'columns',
            'flex',
            'scrollX',
          ].includes(key) &&
          isValidCSS(camelToKebab(key), val)
        ) {
          result[key] = isNumberFormat(style[key])
            ? `${+style[key]}px`
            : style[key];
        }
        break;
    }
  });
  return result;
}

export function getZIndexStyle(zIndex?: string | number) {
  const style: CSSProperties = {};
  if (zIndex !== undefined) {
    style.zIndex = +zIndex;
  }
  return style;
}

export const isMobile = (window as any).matchMedia?.(
  '(max-width: 768px)',
).matches;
