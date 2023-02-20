# aipage-widget
> 开发aipage-editor自定义组件的工具集（支持react、vue2.0技术栈）
- 提供注册 aipage-editor 自定义插件和渲染器的方法；
- 目前支持的技术栈：react、vue2.0技术栈，vue3.0自定义组件请使用[aipage-widget](https://github.com/aisuda/vue3-aipage-widget)。
- 备注: 同一个应用禁止同时使用 vue3-aipage-widget 和 aipage-widget（vue2.0 和 vue3.0 不能混合使用）。

### 提供的方法
- registerRenderer: 注册 aipage-editor 自定义渲染器
- registerPlugin: 注册 aipage-editor 自定义插件（在组件物料面板展示）

### 在线Demo
[点击访问在线Demo](https://aisuda.github.io/vue3-aipage-widget/test/preview.html) 【开发中】

## 快速使用

```
npm install --save aipage-widget
```

## 注册 aipage-editor 自定义渲染器
```tsx
import { registerRenderer } from 'aipage-widget';
class InfoCard extends React.PureComponent {
  constructor() {
    super();
  }

  render() {
    const { componentProperties, id } = this.props;
    const { data = {}, style = {} } = componentProperties || {};
    const classes = getClasses(this.props);

    return (
      <div className="react-widget">
        xxxx
      </div>
    );
  }
}
// 注册aipage-editor渲染器
registerRenderer(InfoCard, {
  type: 'react-info-card',
  framework: 'react',
});

export default InfoCard;
```

## 注册aipage-editor插件
```tsx
import { registerPlugin } from 'aipage-widget';

const CustomCardsPlugin = {
  name: 'react信息卡片',
  description: '信息展示卡片',
  componentId: 'react-info-card',
  id: 'react-info-card',
  tags: ['自定义组件'], // 组件分类
  pluginIcon: 'cards-plugin',
  order: 1, // 展示顺序（从小到大展示）
  type: 'element', // 渲染器类型
  device: ['app'], // 设置类型
  docLink: '',
  demoProperties: {
    componentId: 'react-info-card',
    type: 'element',
    componentProperties: {
      data: {},
      style: {},
    },
  },
  panelControls: {
    type: 'tabs',
    tabs: [
      {
        title: '属性',
        controls: [
          {
            type: 'collapse',
            title: '数据',
            controls: [
              {
                type: 'textarea',
                name: 'title',
                label: '卡片title',
                value:
                  'amis 是一个低代码前端框架，它使用 JSON 配置来生成页面，可以减少页面开发工作量，极大提升效率。',
              },
              {
                type: 'text',
                name: 'backgroundImage',
                label: '展示图片',
                value:
                  'https://search-operate.cdn.bcebos.com/64c279f23794a831f9a8e7a4e0b722dd.jpg',
              },
              {
                type: 'input-number',
                name: 'img_count',
                label: '图片数量',
                value: 3,
              },
              {
                type: 'input-number',
                name: 'comment_count',
                label: '评论数',
                value: 2021,
              },
            ],
          },
        ],
      },
      {
        title: '外观',
        controls: [
          {
            title: '布局',
            type: 'collapse',
            controls: [
              {
                type: 'button-icon-group',
                name: 'style.display',
                label: '显示',
                value: 'block',
                options: [
                  {
                    label: '块级(block)',
                    icon: 'block',
                    value: 'block',
                  },
                  {
                    label: '行内区块(inline-block)',
                    icon: 'inlineBlock',
                    value: 'inline-block',
                  },
                  {
                    label: '行内元素(inline)',
                    icon: 'inline',
                    value: 'inline',
                  },
                ],
              },
              {
                name: 'style',
                type: 'whSet',
                label: '宽度',
                options: [
                  {
                    label: '',
                    value: 'width',
                  },
                ],
              },
            ],
          },
          {
            type: 'collapse',
            title: '边距',
            controls: {
              name: 'style.box',
              type: 'boxModel',
              label: false,
            },
          },
        ],
      },
    ],
  },
}
// 注册一个aipage-editor插件（可视化编辑器需要，会在组件面板指定分类中展示）
registerPlugin(CustomCardsPlugin);

export default CustomCardsPlugin;
```
