# `babel-config`

> description:
用于babel编译（组件、公用包）使用

## 注意
- 使用@babel/plugin-transform-runtime来做polyfill
- 对于Promise、Set应该是宿主环境就有
- [此配置编译的包，需要宿主包含@babel/runtime](https://www.babeljs.cn/docs/babel-plugin-transform-runtime#installation)

## Usage

```
import babelConfig from '@atom-web/babel-config';

```
