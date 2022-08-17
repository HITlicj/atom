# @atom-web/fabric

一个包含 prettier，eslint，stylelint 的配置文件合集

A collection of configuration files containing prettier, eslint, stylelint

# Use

安装

```bash
npm i @atom-web/fabric --save-dev
yarn add @umijs/fabric -D
```

in `.eslintrc.js`

```js
module.exports = {
  extends: [require.resolve('@atom-web/fabric/lib/eslint')],
  
  rules: {
    // your rules
  },
};
```

in `.stylelintrc.js`

```js
module.exports = {
  extends: [require.resolve('@atom-web/fabric/lib/stylelint')],
  rules: {
    // your rules
  },
};
```

in `.prettierrc.js`

```js
const prettier = require('@atom-web/fabric/lib/prettier');

module.exports = {
  ...prettier,
};
```

# 命令行初始化项目
