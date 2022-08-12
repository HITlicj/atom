# `tsconfig`

> description: tsconfig的最佳实践

- 本包提供基础的typescript config;
- 收纳各种配置的解释说明（构建的知识网）；

## 配置解释

#### 建议配置
> moduleResolution (建议： "Node")
- 共有两种可用的模块解析策略：Node和Classic。 你可以使用 --moduleResolution标记来指定使用哪种模块解析策略。若未指定，那么在使用了 --module AMD | System | ES2015时的默认值为Classic，其它情况时则为Node。
**优先级ts --> tsx --> d.ts； 读取package.json里面的types属性**
- 详细教程见[模块解析](https://www.tslang.cn/docs/handbook/module-resolution.html)
> strict (建议：strict)
- 启用所有严格类型检查选项。
- strict相当于启用 
  - noImplicitAny, 
    - 在表达式和声明上有隐含的 any类型时报错。
  - noImplicitThis,
    - 表示当 this 表达式值为 any 类型时生成一个错误信息
  - alwaysStrict，
    - 以严格模式解析并为每个源文件生成 "use strict"语句
  - strictNullChecks
    - 在严格的 null检查模式下， null和 undefined值不包含在任何类型里，只允许用它们自己和 any来赋值（有个例外， undefined可以赋值到 void）。
  - strictFunctionTypes
    - 禁用函数参数双向协变检查。(todo)
  - strictPropertyInitialization
    - 确保类的非undefined属性已经在构造函数里初始化。若要令此选项生效，需要同时启用--strictNullChecks。

> esModuleInterop (建议：true)
- 由于cjs里面是没有default
- 当esm引入cjs时（import React from "react"）编译报错
- tsc/babel/webpack都有兼容处理 
- esModuleInterop为true开启
**module为esm时失效**
- 相关文档：
  - [由 allowSyntheticDefaultImports 引起的思考](https://blog.leodots.me/post/40-think-about-allowSyntheticDefaultImports.html)

> allowSyntheticDefaultImports(建议：true)
- 允许从没有设置默认导出的模块中默认导入。这并不影响代码的输出，仅为了类型检查。
- 说明：见esModuleInterop
- 相关文档：
  - https://blog.leodots.me/post/40-think-about-allowSyntheticDefaultImports.html

> forceConsistentCasingInFileNames(建议：true)
- 禁止对同一个文件的不一致的引用。
- 设置为true时，将强制区分大小写。默认为false。
```typescript
//2a.ts
export const PI = 3.1415926;
//1a.ts
import {PI} from './2A.ts';
function fun(){
  return PI;
}
```
以上代码默认可以通过，当强制文件区分大小写时，则提示错误 '2a' !== '2A'

> skipLibCheck
- 忽略所有的声明文件（ *.d.ts）的类型检查。
- 一个常见的错误是，类型校验结果中，有 node_modules 第三方包的类型报错。解决方案是：第三方包的 types 指

#### 建议按照默认配置
> allowJs (建议：false[默认值])
- JS文件（.js和.jsx）也被包含进来如果allowJs被设置成true
- 编译器默认包含当前目录和子目录下所有的TypeScript文件（.ts, .d.ts 和 .tsx），排除在"exclude"里指定的文件

> typeRoots (建议：不要配置)
- 默认所有可见的"@types"包会在编译过程中被包含进来。 node_modules/@types文件夹下以及它们子文件夹下的所有包都是可见的； 也就是说， ./node_modules/@types/，../node_modules/@types/和../../node_modules/@types/等等。
- 如果指定了typeRoots，只有typeRoots下面的包才会被包含进来。 比如：
```json5
{
   "compilerOptions": {
       "typeRoots" : ["./typings"]
   }
}
```
- 若需要添加自定义包的目录
建议
```json5
{
   "compilerOptions": {
       "typeRoots" : ["./typings", "node_modules/@types"]
   }
}
```
> types
如果指定了types，只有被列出来的包才会被包含进来。 比如：
```json5
{
  "compilerOptions": {
    "types" : ["node", "lodash", "express"]
  }
}
```
- 这个tsconfig.json文件将仅会包含 ./node_modules/@types/node，./node_modules/@types/lodash和./node_modules/@types/express。/@types/。 node_modules/@types/*里面的其它包不会被引入进来。
指定"types": 
- []来禁用自动引入@types包。

**注意，自动引入只在你使用了全局的声明（相反于模块）时是重要的。 如果你使用 import "foo"语句，TypeScript仍然会查找node_modules和node_modules/@types文件夹来获取foo包。**
> preserveConstEnums (建议： false[默认值])
- 在默认情况下，使用 const 修饰符后，枚举不会生成映射代码。
- 如下，我们可以看出：使用 const 修饰符后，编译器不会生成任何 RequestMethod 枚举的任何映射代码，在其他地方使用时，内联每个成员的值，节省很大开销。
```typescript
const enum RequestMethod {
  Get,
  Post,
  Put,
  Delete
}

let methods = [
  RequestMethod.Get,
  RequestMethod.Post
]
```
- 编译结果
```typescript
"use strict";
let methods = [
  0 /* Get */,
  1 /* Post */
];
```
- 当然，我们希望生成映射代码时，也可以设置 tsconfig.json 中的配置，设置 preserveConstEnums 编译器选项为 true ：
```json5
{
  "compilerOptions": {
    "target": "es5",
      "preserveConstEnums": true
  }
}
```
- 最后编译结果变成：
```javascript
"use strict";
var RequestMethod;
(function (RequestMethod) {
  RequestMethod[RequestMethod["Get"] = 0] = "Get";
  RequestMethod[RequestMethod["Post"] = 1] = "Post";
  RequestMethod[RequestMethod["Put"] = 2] = "Put";
  RequestMethod[RequestMethod["Delete"] = 3] = "Delete";
})(RequestMethod || (RequestMethod = {}));
let methods = [
  0 /* Get */,
  1 /* Post */
];
```

#### 其他配置
> Reference
- 前端项目和后端node项目在同一个git仓库下开发，两个项目依赖同一个配置文件，但我们希望前后端项目进行灵活的分别打包，那么我们可以配置reference

> baseUrl和paths
- 最合适做法是将相对路径维护在tsconfg.json的baseUrl和paths中，后续其他配置都读取tsconfig。
**需要注意，paths只影响tsc编译，但不会对输出内容进行修改。也就是说，ts-loader(或babel-loader)输出的js文件还会是基于相对路径引入的。如果webpack不配置对应的alias，后续构建将会出错。**
- [基于baseUrl和paths引入模块](https://www.tslang.cn/docs/handbook/module-resolution.html)
## 参考文档
- [esModuleInterop 到底做了什么？](https://zhuanlan.zhihu.com/p/148081795)
- [由 allowSyntheticDefaultImports 引起的思考](https://blog.leodots.me/post/40-think-about-allowSyntheticDefaultImports.html)
- [如何用 Project Reference 优化 tsc 编译性能](https://juejin.cn/post/7129130418657296421)
- [漫谈 Typescript 研发体系建设](https://zhuanlan.zhihu.com/p/86276764)
