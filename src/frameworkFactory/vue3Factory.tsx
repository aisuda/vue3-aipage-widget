/**
 * @file 自定义组件所需的 vue3.0 对接
 */
import React from 'react';
// @ts-ignore
import { createApp } from 'vue/dist/vue.esm-bundler';
import { extendObject } from '../utils';

export function createVue3Component(vueObj: any) {
  if (!vueObj || (typeof vueObj !== 'function' && typeof vueObj !== 'object')) {
    return;
  }

  class VueFactory extends React.Component<any> {
    domRef: any;
    app: any;
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
        data: () => extendObject(
          amisData,
          typeof data === 'function' ? data() : data,
        ),
        ...rest,
        props: rest.props || {},
      });
      Object.keys(amisFunc).forEach((key) => {
        this.app.$props[key] = amisFunc[key];
      });
      this.app.mount(this.domRef.current);
      this.domRef.current.setAttribute('data-component-id', this.props.id);
    }

    componentDidUpdate() {
      if (!this.isUnmount) {
        Object.keys(this.props).forEach(
          (key) =>
            typeof this.props[key] !== 'function' &&
            (this.app[key] = this.props[key]),
        );
        this.app.$forceUpdate();
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
          amisData[key] = value;
        }
      });
      return { amisData, amisFunc };
    }

    render() {
      return <div ref={this.domRef}></div>;
    }
  }

  return VueFactory;
}
