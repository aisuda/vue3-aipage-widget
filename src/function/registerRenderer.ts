import { createVue3Component } from '../frameworkFactory/vue3Factory';
import { getFramework, Framework, isString, consoleTag, transformComponentId } from '../utils';

/**
 * 注册自定义组件配置项
 */
export interface RendererOption {
  /**
   * 渲染器名称
   * 备注：渲染过程中用于查找对应的渲染器
   */
  type: string;

  /**
   * 自定义组件技术栈类型
   * 备注：默认为react
   */
  framework?: string;
}

/**
 * registerRenderer: 注册一个aipage-editor自定义渲染器
 *【方法参数说明】
 * newRenderer: 新的渲染器,
 * rendererOption: {
 *   type: 渲染器的type类型，比如：input、text-area、select-user等
 *   framework?: 技术栈类型，默认为 react 技术栈，可选技术栈：vue2、react
 * }
 * 备注：暂不支持 jquery 技术栈
 */
export function registerRenderer(
  newRenderer: any,
  rendererOption: string | RendererOption,
) {
  if (!newRenderer) {
    return;
  }
  // 1.默认注册配置参数
  const curRendererOption: RendererOption = {
    type: '',
    framework: Framework.react, // 默认为 react 技术栈
  };
  // 2.获取相关配置参数
  if (rendererOption && isString(rendererOption)) {
    // rendererOption为字符串则将其设置为type
    Object.assign(curRendererOption, {
      type: rendererOption,
    });
  } else {
    Object.assign(curRendererOption, rendererOption);
  }

  if (curRendererOption && !curRendererOption.type) {
    console.error(
      `${consoleTag}自定义组件注册失败，自定义组件类型（type）不能为空。`,
    );
  } else {
    // 修正framework数值
    curRendererOption.framework = getFramework(curRendererOption.framework);

    // 当前支持的技术栈类型
    const resolverMap: any = {
      react: (i: any) => i,
      // vue2: createVue2Component,
      vue3: createVue3Component,
    };

    // 支持多技术栈
    const curRendererComponent =
      resolverMap[curRendererOption.framework](newRenderer);

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
         window.postMessage(
          {
            type: 'aipage-editor-register-renderer-event',
            eventMsg: `${consoleTag}注册一个自定义aipage-editor渲染器`,
            customComponentId: newComponentId
          },
          '*',
        );
      }
    }
  }
}

declare const window: Window & { AIPageEditorCustomRenderers: any };

function AddCustomRenderer(type: string, component: any) {
  if (window && !window.AIPageEditorCustomRenderers) {
    (window as any).AIPageEditorCustomRenderers = {};
  }
  const componentId = transformComponentId(type);
  if (!window.AIPageEditorCustomRenderers[componentId]) {
    window.AIPageEditorCustomRenderers[componentId] = component;
    return componentId;
  } else {
    console.error(`${consoleTag}自定义渲染器失败，已存在同名渲染器类型(${type})。`);
  }
  return null;
}
