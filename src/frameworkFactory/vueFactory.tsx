/**
 * @file 自定义组件所需的 vue2.0 对接
 */
import React from 'react';
import Vue from 'vue';
import { ref, isProxy, shallowRef } from 'vue';
import isObject from 'lodash/isObject';
import { extendObject } from '../utils';
import { getBoxPosition, transformStyle } from '../utils/style';

export function createVue2Component(vueObj: any) {
  if (!vueObj || (typeof vueObj !== 'function' && typeof vueObj !== 'object')) {
    return;
  }

  class VueFactory extends React.Component<any> {
    domRef: any;
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
      this.vm = new Vue({
        data: () =>
          extendObject(amisData, typeof data === 'function' ? data() : data),
        ...rest,
        props: rest.props || {},
      });
      Object.keys(amisFunc).forEach((key) => {
        this.vm.$props[key] = amisFunc[key];
      });
      this.domRef.current.appendChild(this.vm.$mount().$el); // 最外层会多一个div【待优化】
      this.domRef.current.setAttribute('data-component-id', this.props.id);
    }

    componentDidUpdate() {
      if (!this.isUnmount) {
        Object.keys(this.props).forEach(
          (key) =>
            typeof this.props[key] !== 'function' &&
            (this.vm[key] = this.props[key]),
        );
        this.vm.$forceUpdate();
      }
    }

    componentWillUnmount() {
      this.isUnmount = true;
      this.vm.$destroy();
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
