const CracoLessPlugin = require('craco-less');
const webpack = require('webpack');

const path = require('path');
const resolve = dir => path.join(__dirname, '.', dir);

// 分析打包时间
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();

module.exports = {
  webpack: smp.wrap({
    configure: {
      /*在这里添加任何webpack配置选项: https://webpack.js.org/configuration */
      module: {
     
      },
      resolve: {
        modules: [
          // 指定以下目录寻找第三方模块，避免webpack往父级目录递归搜索
          resolve('src'),
          resolve('node_modules')
        ],
        alias: {
          '@': resolve('src') // 缓存src目录为@符号，避免重复寻址
        }
      }
    }
  }),
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};