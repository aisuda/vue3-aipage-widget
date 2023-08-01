/**
 * @file 自定义组件所需的 vue3.0 对接
 */
import isObject from 'lodash/isObject';
import React from 'react';
// @ts-ignore
import { createApp, getCurrentInstance, ref, isProxy, shallowRef } from 'vue';
// 引入 uView UI
// @ts-ignore
import uView from 'vk-uview-ui';
import { extendObject } from '../utils';
import { getBoxPosition, transformStyle } from '../utils/style';

export function createVue3Component(vueObj: any) {
  if (!vueObj || (typeof vueObj !== 'function' && typeof vueObj !== 'object')) {
    return;
  }

  class VueFactory extends React.Component<any> {
    domRef: any;
    app: any;
    vm: any;
    isUnmount: boolean;

    constructor(props: any) {
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
        data: () =>
          extendObject(amisData, typeof data === 'function' ? data() : data),
        ...rest,
        props: rest.props || {},
      });
      // 以下兼容写法是为了支持 uview，待后续在 uview 端优化
      if (this.app && !this.app.prototype) {
        this.app.prototype = {};
      }
      if (this.app && !this.app.filter) {
        this.app.filter = () => {};
      }
      // 默认支持 uView UI
      this.app.use(uView);

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
          Object.keys(amisData).forEach((key) => {
            this.vm[key] = amisData[key];
          });
          this.vm.$forceUpdate();
        }
      }
    }

    componentWillUnmount() {
      this.isUnmount = true;
      this.app.unmount();
    }

    resolveAmisProps() {
      let amisFunc: any = {};
      let amisData: any = {};

      Object.keys(this.props).forEach((key) => {
        const value = this.props[key];
        if (typeof value === 'function') {
          amisFunc[key] = value;
        } else {
          if (isProxy(value)) {
            amisData[key] = shallowRef(value);
          } else if (isObject(value)) {
            amisData[key] = ref(value);
          } else {
            // 非对象类数据无需特殊处理
            amisData[key] = value;
          }
        }
      });
      return { amisData, amisFunc };
    }

    render() {
      const { componentProperties, node } = this.props;
      const style =
        componentProperties && componentProperties.style
          ? componentProperties.style
          : {};
      const curStyle = {
        ...getBoxPosition(node || this.props),
        ...transformStyle(style),
      };
      return <div ref={this.domRef} style={curStyle}></div>;
    }
  }

  return VueFactory;
}
