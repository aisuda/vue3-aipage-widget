'use strict';
const path = require('path');
// 统一路径解析
function resolve(dir) {
  return path.resolve(__dirname, dir);
}

// 包括生产和开发的环境配置信息
module.exports = {
  settings: {
    enableESLint: false, // 调试模式是否开启ESLint，默认开启ESLint检测代码格式
    enableESLintFix: false, // 是否自动修正代码格式，默认不自动修正
    enableStyleLint: false, // 是否开启StyleLint，默认开启ESLint检测代码格式
    enableStyleLintFix: false // 是否需要StyleLint自动修正代码格式
  },
  webpack: {
    resolve: {
      // webpack的resolve配置
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.esm.js', '.umd.js', '.min.js', '.json'], // 用于配置webpack在尝试过程中用到的后缀列表
      alias: {
        '@': resolve('src'),
        $function: resolve('src/function'),
        $utils: resolve('src/utils'),
      },
    },
    createDeclaration: true, // 打包时是否创建ts声明文件
    ignoreNodeModules: false, // 打包时是否忽略 node_modules
    allowList: [], // ignoreNodeModules为true时生效
    externals: [],
    projectDir: ['src', 'demo'],
    template: resolve('./demo/template.html'), // 使用自己的html模板
    cssLoaderUrl: true,
    moduleRules: [], // 用于配置自定义loaders
    plugins: [], // 用于配置自定义plugins
  },
  preview: {
    entry: { // 本地预览自定义组件内容
      index: './demo/preview.js',
    },
    // 用于开启本地调试模式的相关配置信息
    NODE_ENV: 'development',
    port: 80,
    assetsPublicPath: '/', // 设置静态资源的引用路径（根域名+路径）
    assetsSubDirectory: '',
    hostname: 'localhost',
    proxyTable: {
      '/apiTest': {
        target: 'http://api-test.com.cn', // 不支持跨域的接口根地址
        ws: true,
        changeOrigin: true
      }
    },
    cssSourceMap: true,
    closeHotReload: false, // 是否关闭热更新
    autoOpenBrowser: true,
  },
  dev: {
    entry: { // 调试模式的入口
      index: [
        './demo/react-widget/index.js',
        './demo/react-widget/plugin.jsx',
        './demo/vue-widget/index.js',
        './demo/vue-widget/plugin.jsx',
      ],
    },
    // 用于开启本地调试模式的相关配置信息
    NODE_ENV: 'development',
    ignoreNodeModules: false, // 打包时是否忽略 node_modules
    port: 80,
    autoOpenBrowser: true,
    assetsPublicPath: '/', // 设置静态资源的引用路径（根域名+路径）
    assetsSubDirectory: '',
    hostname: 'localhost',
    cssSourceMap: false,
    closeHotReload: false, // 是否关闭热更新
    closeEditorClient: true, // 是否关闭自动注入amis-editor
  },
  linkDebug1: {
    entry: { // 外链调试（爱速搭中预览本地自定义组件）
      index: [
        './demo/react-widget/index.js',
        './demo/react-widget/plugin.jsx',
        './demo/vue-widget/index.js',
        './demo/vue-widget/plugin.jsx',
      ],
    },
    NODE_ENV: 'production',
    port: 80,
    autoOpenBrowser: false,
    closeHtmlWebpackPlugin: true, // 关闭HtmlWebpackPlugin
    assetsPublicPath: '/', // 设置静态资源的引用路径（根域名+路径）
    assetsSubDirectory: '',
    hostname: 'localhost',
    cssSourceMap: true,
    closeHotReload: true, // 是否关闭热更新
    debugMode: 'aipage-editor'
  },
  linkDebug: { // 外链调试（使用构建后的 aipage-widget）
    entry: { // 外链调试：爱速搭中预览本地自定义组件）
      index: [
        './demo2/react-widget/index.js',
        './demo2/react-widget/plugin.jsx',
        './demo2/vue-widget/index.js',
        './demo2/vue-widget/plugin.jsx',
      ],
    },
    NODE_ENV: 'production',
    port: 80,
    autoOpenBrowser: false,
    closeHtmlWebpackPlugin: true, // 关闭HtmlWebpackPlugin
    assetsPublicPath: '/', // 设置静态资源的引用路径（根域名+路径）
    assetsSubDirectory: '',
    hostname: 'localhost',
    cssSourceMap: true,
    closeHotReload: true, // 是否关闭热更新
    debugMode: 'aipage-editor'
  },
  build2lib: {
    entry: {
      // webpack构建入口
      index: './src/main.ts', // 构建lib的入口
    },
    // 用于构建生产环境代码的相关配置信息
    NODE_ENV: 'production', // development / production
    libraryName: 'aipageWidget', // 构建第三方功能包时最后导出的引用变量名
    assetsRoot: resolve('./dist'), // 打包后的文件绝对路径（物理路径）
    assetsPublicPath: '/', // 设置静态资源的引用路径（根域名+路径）
    assetsSubDirectory: '', // 资源引用二级路径
    ignoreNodeModules: true, // 打包时是否忽略 node_modules
    // allowList: ['jquery', 'vue'], // ignoreNodeModules为true时生效
    productionSourceMap: false,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css', 'json'],
    bundleAnalyzerReport: false,
  },
  build2esm: {
    input: resolve('src/main.ts'),
    fileName: 'index',
    // 不将以下依赖打包到输出文件中
    excludeList: [
      'amis',
      'amis-core',
      'amis-ui',
      'amis-editor',
      'aipage-editor',
      'axios',
      'jquery',
      'react',
      'react-dom',
      'vue',
    ],
  }
};
