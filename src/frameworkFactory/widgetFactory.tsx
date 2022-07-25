/**
 * @file 非 react和vue技术栈 自定义组件对接
 */
import React from 'react';

export function createWidgetComponent(widgetObj: any) {
  if (
    !widgetObj ||
    (typeof widgetObj !== 'function' && typeof widgetObj !== 'object')
  ) {
    return;
  }

  class WidgetFactory extends React.Component {
    dom: any;
    instance;
    isUnmount: boolean;

    constructor(props: any) {
      super(props);
      this.domRef = this.domRef.bind(this);
      this.instance =
        typeof widgetObj === 'function' ? new widgetObj() : widgetObj;
    }

    componentDidMount() {
      const { onMount } = this.instance;
      onMount && onMount.apply(this.instance, [this.props]);
    }

    componentDidUpdate(prevProps: any) {
      if (!this.isUnmount) {
        const { onUpdate } = this.instance;
        onUpdate && onUpdate.apply(this.instance, [this.props, prevProps]);
      }
    }

    componentWillUnmount() {
      const { onUnmout } = this.instance;
      onUnmout && onUnmout.apply(this.instance, this.props);
      this.isUnmount = true;
    }

    domRef(dom: any) {
      this.instance.$root = this.dom = dom;
      this._render();
    }

    _render() {
      if (!this.dom) {
        return;
      }

      let template = this.instance.template;

      if (typeof template === 'string') {
        this.dom.innerHTML = template;
      } else if (typeof template === 'function') {
        this.dom.innerHTML = template(this.props);
      }
    }

    render() {
      return <div ref={this.domRef}></div>;
    }
  }

  return WidgetFactory;
}
