/**
 * @file 自定义组件所需的 vue3.0 对接
 */
import React from 'react';
// @ts-ignore
import { createApp, getCurrentInstance, ref } from 'vue';
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
      let amisFunc: any = {};
      let amisData: any = {};

      Object.keys(this.props).forEach((key) => {
        const value = this.props[key];
        if (typeof value === 'function') {
          amisFunc[key] = value;
        } else {
          amisData[key] = ref(value);
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
