/*! For license information please see index.umd.js.LICENSE.txt */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.aipageWidget=t():e.aipageWidget=t()}(this,(function(){return function(){"use strict";var e={n:function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,{a:r}),r},d:function(t,r){for(var o in r)e.o(r,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:r[o]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r:function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{Framework:function(){return r},camelToKebab:function(){return l},cloneObject:function(){return p},consoleTag:function(){return o},createVue3Component:function(){return fe},dateFormat:function(){return re},deepClone:function(){return a},extendObject:function(){return g},getAlignModeStyle:function(){return te},getBackgroundStyle:function(){return U},getBorderRadius:function(){return Q},getBoxPosition:function(){return X},getBoxShadow:function(){return J},getBoxStyle:function(){return V},getClasses:function(){return ue},getFlexStyle:function(){return Y},getFontStyle:function(){return Z},getFramework:function(){return n},getImageSize:function(){return G},getLegacyHref:function(){return N},getThemeStyle:function(){return $},getVideoThumbnail:function(){return ee},getWeek:function(){return oe},getZIndexStyle:function(){return de},isEditorPlugin:function(){return i},isMobile:function(){return ce},isNumberFormat:function(){return d},isObject:function(){return s},isString:function(){return u},isValidCSS:function(){return ae},kebabToCamel:function(){return c},makeClassnames:function(){return ie},parseThemeColor:function(){return F},registerPlugin:function(){return b},registerRenderer:function(){return pe},toPx:function(){return z},toRpx:function(){return _},toWHset:function(){return K},transformComponentId:function(){return f},transformStyle:function(){return se}});var r,o="[vue3-aipage-widget]";function n(e){var t=r.react;if(!e)return t;var o=e.toLowerCase().trim();switch(o){case"jquery":case"jq":o=r.jquery;break;case"vue2":case"vue 2":case"vue2.0":case"vue 2.0":o=r.vue2,console.error("vue3-aipage-widget 不支持 vue2.0 技术栈，请改用aipage-widget支持。");break;case"vue":case"vue3":case"vue 3":case"vue3.0":case"vue 3.0":o=r.vue3;break;default:o=r.react}return o}function i(e){var t=!1;if(!e||!s(e))return!1;var r=e;return r.name?r.id?r.componentId?r.description?!r.tags||Array.isArray(r.tags)&&0===r.tags.length?console.error(o+"自定义插件注册失败，插件分类（tags）不能为空。"):(r.pluginIcon||(r.pluginIcon="cards-plugin"),r.type||(r.type="element"),t=!0):console.error(o+"自定义插件注册失败，插件描述（description）不能为空。"):console.error(o+"自定义插件注册失败，渲染器ID（componentId）不能为空。"):console.error(o+"自定义插件注册失败，插件ID（id）不能为空。"):console.error(o+"自定义插件注册失败，插件名称（name）不能为空。"),t}function a(e){var t;if("object"==typeof e)if(Array.isArray(e))for(var r in t=[],e)t.push(a(e[r]));else if(null===e)t=null;else if(e.constructor===RegExp)t=e;else for(var o in t={},e)t[o]=a(e[o]);else t=e;return t}function u(e){return"String"===Object.prototype.toString.call(e).slice(8,-1)}function s(e){var t=!1;return"Object"===Object.prototype.toString.call(e).slice(8,-1)&&(t=!0),t}function d(e){return"NaN"!==parseFloat(String(e)).toString()}function c(e){return e.replace(/-[a-z]/g,(function(e){return e[1].toUpperCase()}))}function l(e){return e.replace(/([A-Z])/g,"-$1").toLowerCase()}function f(e){return("-"+e).replace(/(-[A-Za-z0-9])/g,(function(e){return e.toUpperCase().replace("-","")}))}function p(e,t){void 0===t&&(t=!0);var r=e&&e.__super?Object.create(e.__super,{__super:{value:e.__super,writable:!1,enumerable:!1}}):Object.create(Object.prototype);return t&&e&&Object.keys(e).forEach((function(t){return r[t]=e[t]})),r}function g(e,t,r){void 0===r&&(r=!0);var o=p(e,r);return t&&Object.keys(t).forEach((function(e){return o[e]=t[e]})),o}function b(e){return i(e)&&window&&window.postMessage&&function(e,t){window&&!window.AIPageEditorCustomPlugins&&(window.AIPageEditorCustomPlugins={});var r=f(e);return window.AIPageEditorCustomPlugins[r]?(console.error(o+"注册自定义插件失败，已存在同名插件("+e+")。"),null):(window.AIPageEditorCustomPlugins[r]=t,r)}(e.id,e)&&(console.info(o+"触发注册自定义插件("+e.name+")事件:",e),window.postMessage({type:"aipage-editor-register-plugin-event",eventMsg:o+"注册一个自定义aipage-editor插件",editorPluginName:e.name,customEditorPlugin:e},"*")),e}!function(e){e.react="react",e.vue2="vue2",e.vue3="vue3",e.jquery="jquery"}(r||(r={})),window.uni||(window.uni={});var h=require("@babel/runtime/helpers/extends"),m=e.n(h),v=require("@babel/runtime/helpers/objectWithoutPropertiesLoose"),y=e.n(v),w=require("@babel/runtime/helpers/assertThisInitialized"),S=e.n(w),x=require("@babel/runtime/helpers/inheritsLoose"),k=e.n(x),R=require("lodash/isObject"),C=e.n(R),j=require("react"),I=e.n(j),P=require("vue"),O=require("vk-uview-ui"),T=e.n(O),L=require("lodash/pick"),M=e.n(L),B=require("lodash/isNumber"),A=e.n(B),W=require("lodash/cloneDeep"),E=e.n(W),q=require("classnames"),D=e.n(q),H=375,F=function(e){return e};function N(e){var t=location.pathname.split("/").slice(0,-1);return t.push(e),t.join("/")}function _(e){var t=+[e][e&&0]/375*H;return Number.isNaN(t)?void 0:Math.round(t)+"px"}function z(e){var t=+[e][e&&0]/H*375;return Number.isNaN(t)?void 0:Math.round(t)+"px"}function U(e){void 0===e&&(e={});var t=M()(E()(e)||{},"backgroundImage","backgroundRepeat","backgroundSize","backgroundPosition","backgroundColor");return e.backgroundImage&&/linear-gradient/g.test(e.backgroundImage)?t.backgroundImage=e.backgroundImage:(e.backgroundColor&&(t.backgroundColor=F(e.backgroundColor)),e.backgroundImage&&(t.backgroundImage="url('"+e.backgroundImage+"')")),t}function $(e,t,r){void 0===e&&(e={});var o={},n=[e[t+"Color"],e.defaultColor];return"default"===t&&(n[0]=e.inverseColor,n.reverse()),r&&(o.borderColor=n[0],n.reverse()),o.backgroundColor=n[0],o.color=n[1],o}function Z(e){void 0===e&&(e={});var t=M()(E()(e)||{},"color","fontFamily","lineHeight","textAlign");return e.bold&&(t.fontWeight="bold"),e.italic&&(t.fontStyle="italic"),e.underline&&(t.textDecoration="underline"),e.lines&&(t.WebkitLineClamp=""+e.lines),t.lineHeight&&(t.lineHeight=t.lineHeight>=12?parseInt(t.lineHeight,10)+"px":parseInt(t.lineHeight,10)),t.fontSize=_(+e.fontSize),t.letterSpacing=_(+e.letterSpacing),t}function V(e){void 0===e&&(e={});var t=M()(E()(e)||{},"borderLeftStyle","borderRightStyle","borderTopStyle","borderBottomStyle","borderLeftColor","borderRightColor","borderTopColor","borderBottomColor");return+e.borderTopWidth>0?(t.borderTopWidth=_(+e.borderTopWidth),t.borderTopColor=F(e.borderTopColor)):delete t.borderTopStyle,+e.borderLeftWidth>0?(t.borderLeftWidth=_(+e.borderLeftWidth),t.borderLeftColor=F(e.borderLeftColor)):delete t.borderLeftStyle,+e.borderRightWidth>0?(t.borderRightWidth=_(+e.borderRightWidth),t.borderRightColor=F(e.borderRightColor)):delete t.borderRightStyle,+e.borderBottomWidth>0?(t.borderBottomWidth=_(+e.borderBottomWidth),t.borderBottomColor=F(e.borderBottomColor)):delete t.borderBottomStyle,t.marginTop=_(+e.marginTop),t.marginLeft=_(+e.marginLeft),t.marginRight=_(+e.marginRight),t.marginBottom=_(+e.marginBottom),t.paddingTop=_(+e.paddingTop),t.paddingLeft=_(+e.paddingLeft),t.paddingRight=_(+e.paddingRight),t.paddingBottom=_(+e.paddingBottom),t.borderTopLeftRadius=_(+e.borderTopLeftRadius),t.borderTopRightRadius=_(+e.borderTopRightRadius),t.borderBottomLeftRadius=_(+e.borderBottomLeftRadius),t.borderBottomRightRadius=_(+e.borderBottomRightRadius),t}function Y(e){var t,r;void 0===e&&(e={});var o={};if(e.display&&(o.display=e.display),"flex"===o.display){var n=e.flexSetting||{};o.flexDirection=n.direction||"row",o.alignItems=n.align||"stretch",o.justifyContent=n.justify||"flex-start"}return(null==(t=e.flexSetting)?void 0:t.flexShrink)>=0&&(o.flexShrink=+e.flexSetting.flexShrink),(null==(r=e.flexSetting)?void 0:r.flex)>=0&&(o.flex=+e.flexSetting.flex),o}function K(e,t){var r=e[t+"Unit"]||"px";return"auto"===r||e[t]<=0?"auto":"px"===r?_(+e[t]):e[t]+r}function X(e){var t=(null==e?void 0:e.componentProperties)||{},r=t.style,o=void 0===r?{}:r,n=t.isFlow,i=(o.justification||"top left").split(" "),a={};return n?(a.height=K(o,"height"),a.width=K(o,"width"),a.maxWidth="100%",a.width>0&&(a.flexShrink=0)):(a[i[1]]=+o.x+"px",a[i[0]]=+o.y+"px",a.height=K(o,"height")||"auto",a.width=K(o,"width")||"100%",a.position=o.position||"absolute"),o.opacity>=0&&(a.opacity=+o.opacity/100),o.display&&(a.display=o.display),a}function G(e){return e||(e=1),{paddingTop:100/e+"%"}}function J(e){void 0===e&&(e={});var t=e,r=t.angle,o=void 0===r?0:r,n=t.x,i=t.y,a=t.blur,u=t.size,s=t.color,d=t.distance,c=void 0!==n?n:Math.round(Math.sin(o*(Math.PI/180))*d),l=void 0!==i?i:-Math.round(Math.cos(o*(Math.PI/180))*d);return(n||i||a||u||d)&&A()(c)&&A()(l)?{boxShadow:_(c)+" "+_(l)+" "+_(a||0)+" "+_(u||0)+" "+F(s)}:{}}function Q(e){void 0===e&&(e={});var t=M()(E()(e)||{},"borderLeftStyle","borderRightStyle","borderTopStyle","borderBottomStyle","borderLeftColor","borderRightColor","borderTopColor","borderBottomColor");return t.borderTopLeftRadius=_(+e.borderTopLeftRadius),t.borderTopRightRadius=_(+e.borderTopRightRadius),t.borderBottomLeftRadius=_(+e.borderBottomLeftRadius),t.borderBottomRightRadius=_(+e.borderBottomRightRadius),t}function ee(e){if(!e)return"";var t=e.split("/");return e.includes("/sites/")&&t.splice(3,0,"thumbnails"),t.join("/")+".png"}function te(e){return{top:~e.indexOf("bottom")?"auto":0,bottom:~e.indexOf("top")?"auto":0,left:~e.indexOf("right")?"auto":0,right:~e.indexOf("left")?"auto":0}}function re(e,t){var r=function(e,r){t=t.replace(e,r)},o=function(e){return String(e).length>1?String(e):"0"+e},n=new Date(e),i=n.getFullYear(),a=n.getMonth()+1,u=n.getDate(),s=n.getHours(),d=n.getMinutes(),c=n.getSeconds();return r(/yyyy/g,String(i)),r(/yy/g,o(i.toString().slice(2))),r(/MM/g,o(a)),r(/M/g,a),r(/dd/g,o(u)),r(/d/g,u),r(/HH/g,o(s)),r(/H/g,s),r(/hh/g,o(s%12)),r(/h/g,s%12),r(/mm/g,o(d)),r(/m/g,d),r(/ss/g,o(c)),r(/s/g,c),t}function oe(e,t){void 0===t&&(t=!1);var r=864e5,o=new Date(String(e.getFullYear())+"/01/01"),n=o.getDay()>0?8-o.getDay():1;return n=t?n-1:n,Math.abs(Math.ceil((e.getTime()-o.getTime()-n*r)/r/7))}var ne={};function ie(e){if(e&&ne[e])return ne[e];var t=function(){var t=D().apply(void 0,arguments);return t&&e?t.replace(/(^|\s)([A-Z])/g,"$1"+e+"$2").replace(/(^|\s)\:/g,"$1"):t||""};return e&&(ne[e]=t),t}function ae(e,t){return CSS.supports(e,t)}function ue(e){var t=e.componentProperties,r=void 0===t?{}:t,o=e.id,n=r.style||{},i="node-"+o,a={root:i,main:i+" "+(n.className||"")};return Object.keys(n).forEach((function(e){!["font","box","boxShadow","background"].includes(e)&&s(n[e])&&(a[e]=[i+"-"+l(e)])})),a}function se(e){void 0===e&&(e={});var t={};return Object.keys(e).forEach((function(r){switch(r){case"box":t=Object.assign(t,V(e.box));break;case"background":t=Object.assign(t,U(e.background));break;case"font":t=Object.assign(t,Z(e.font));break;case"lineHeight":t.lineHeight=e[r]>=12?parseInt(e[r],10)+"px":parseInt(e[r],10);break;case"boxShadow":t=Object.assign(t,J(e.boxShadow));break;case"opacity":t.opacity=+e[r]/100;break;case"width":t.width=e.autoWidth?"auto":K(e,"width");break;case"flexSetting":t=Object.assign(t,Y(e));break;case"height":t.height=K(e,"height");break;default:var o,n=d(e[r])?+e[r]+"px":e[r];s(e[r])?t=Object.assign(t,((o={})[r]=se(e[r]),o)):!["x","y","css","lineClamp","columns","flex","scrollX"].includes(r)&&ae(l(r),n)&&(t[r]=d(e[r])?+e[r]+"px":e[r])}})),t}function de(e){var t={};return void 0!==e&&(t.zIndex=+e),t}var ce=null==window.matchMedia?void 0:window.matchMedia("(max-width: 768px)").matches,le=["data"];function fe(e){if(e&&("function"==typeof e||"object"==typeof e))return function(t){function r(e){var r;return(r=t.call(this,e)||this).domRef=void 0,r.app=void 0,r.vm=void 0,r.isUnmount=void 0,r.domRef=I().createRef(),r.resolveAmisProps=r.resolveAmisProps.bind(S()(r)),r}k()(r,t);var o=r.prototype;return o.componentDidMount=function(){var t=this,r=this.resolveAmisProps(),o=r.amisData,n=r.amisFunc,i=e="function"==typeof e?new e:e,a=i.data,u=y()(i,le);this.app=(0,P.createApp)(m()({data:function(){return g(o,"function"==typeof a?a():a)}},u,{props:u.props||{}})),this.app&&!this.app.prototype&&(this.app.prototype={}),this.app&&!this.app.filter&&(this.app.filter=function(){}),this.app.use(T()),Object.keys(n).forEach((function(e){t.app.$props[e]=n[e]})),this.vm=this.app.mount(this.domRef.current),this.domRef.current.setAttribute("data-component-id",this.props.id)},o.componentDidUpdate=function(){var e=this;if(!this.isUnmount){var t=this.resolveAmisProps().amisData;this.vm&&(Object.keys(t).forEach((function(r){e.vm[r]=t[r]})),this.vm.$forceUpdate())}},o.componentWillUnmount=function(){this.isUnmount=!0,this.app.unmount()},o.resolveAmisProps=function(){var e=this,t={},r={};return Object.keys(this.props).forEach((function(o){var n=e.props[o];"function"==typeof n?t[o]=n:(0,P.isProxy)(n)?r[o]=(0,P.shallowRef)(n):C()(n)?r[o]=(0,P.ref)(n):r[o]=n})),{amisData:r,amisFunc:t}},o.render=function(){var e=this.props,t=e.componentProperties,r=e.node,o=t&&t.style?t.style:{},n=m()({},X(r||this.props),se(o));return I().createElement("div",{ref:this.domRef,style:n})},r}(I().Component)}function pe(e,t){if(e){var i={type:"",framework:r.react};if(t&&u(t)?Object.assign(i,{type:t}):Object.assign(i,t),i&&!i.type)console.error(o+"自定义组件注册失败，自定义组件类型（type）不能为空。");else{i.framework=n(i.framework);var a={react:function(e){return e},vue3:fe}[i.framework](e);if(window){var s=function(e,t){window&&!window.AIPageEditorCustomRenderers&&(window.AIPageEditorCustomRenderers={});var r=f(e);return window.AIPageEditorCustomRenderers[r]?(console.error(o+"注册自定义渲染器失败，已存在同名渲染器类型("+e+")。"),null):(window.AIPageEditorCustomRenderers[r]=t,r)}(i.type,a);s&&(console.info(o+"触发注册自定义渲染器("+i.type+")事件:",{type:i.type,component:a,framework:i.framework}),window.postMessage({type:"aipage-editor-register-renderer-event",eventMsg:o+"注册一个自定义aipage-editor渲染器",customComponentId:s},"*"))}}}}return t}()}));