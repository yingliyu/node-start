# Nodejs 基础——模块化

## 前言

编程中的模块化思想就是遵循一定的规范，把一个大文件拆成独立并相互依赖的多个小模块。

好处：

- 提高代码的复用性
- 提高代码的可维护性
- 实现按需加载

## 模块的分类

- 内置模块：Nodejs 内置的模块称为内置模块，如 http 模块、fs 模块；
- 自定义模块：用户自己创建的.js 文件；
- 第三方模块：由第三方开发的并非 Nodejs 官方提供的内置模块也不是用户自己创建的模块，使用前需先去[包共享平台](https://www.npmjs.com/)下载包；

内置模块在 Nodejs 源代码的编译过程中编译进了二进制执行文件，在 Node 进程启动时，部分内置模块就直接被加载进内存中，所以这部分内置模块引入时文件定位和编译执行这两个步骤可省略，且在路径分析中优先判断，所以他的加载速度是最快的，如 http 模块、fs 模块等都是 Nodejs 内置的核心模块可直接引入使用。

自定义模块则是在运行时动态加载，需要完整的路径分析、文件定位、编译执行过程速度相比内置模块稍慢。

## 模块化规范

Nodejs 遵循 CommonJS 模块化规范，即 CMJ（CommonJS Module）。由于 Nodejs 刚刚发布的时候，前端没有统一的、官方的模块化规范，因此，它选择使用社区提供的 CommonJS 作为模块化规范，

`CJS`使用`exports`导出模块，`require`导入模块。

**CommonJS 规范：**

> - 每个模块内部，module 变量代表当前模块
> - module 变量是一个对象，它的 exports（即 module.exports）属性是对外的接口
> - 使用 require()方法加载某个模块其实是加载该模块的 module.exports 属性。

CommonJS 规范是通过 module.exports 定义的，在前端浏览器中并不支持此中规范，浏览器不兼容 CommonJS 的根本原因是缺少四个 Node 环境的变量：

- module
- exports
- require
- global

Nodejs 和 Webpack 都是采用的 CommonJS 规范。

**_Commonjs 模块化使用：_**

```js
// 1.加载内置fs模块
const fs = require('fs')
// 2.加载自定义模块
const custom = require('./custom.js')
// 3.加载第三方模块（加载前需要先下载）
const moment = require('moment')
```

## CommonJS 中自定义模块

日常开发过程中经常有很多公共的功能，为了方便复用我们可以把它抽离成一个单独的 js 文件作为一个模块，默认情况下这个模块里的方法和属性是私有的外界无法访问，如需在模块外部使用模块内的方法或属性，需要在模块内部通过 `exports` 或者 `module.exports` 暴露属性或方法。然后在需要使用这些模块的文件中，通过 `require` 的方式引入这个模块，此时就可以使用模块里面暴露的属性和方法了。

```js
// mudule/util.js
// 自定义模块
const formatDate = () => {
  //do something...
  console.log('formatDate...')
}

// exports.formatDate = formatDate
module.exports = { formatDate }
```

```js
//  mudule/index.js
// 导入自定义模块的getData方法
const tools = require('./util')
tools.formatDate() //打印：formatDate...
```

## 使用误区

使用 require()方法导入模块时，默认 `module.exports={}`，exports 和 module.exports 指向同一个对象，最终导入的结果以 `module.exports` 指向的对象为准。

```js
console.log(exports) // {}
console.log(module.exports) // {}
console.log(exports === module.exports) // true
```

**_案例 1_**

```js
exports.username = 'zs'
module.exports = {
  age: 18,
  sex: 0,
}
// 以上代码最终导出的是{age: 18, sex: 0 }
```

**_案例 2：_**

```js
module.exports.username = 'zs'
exports = {
  age: 18,
  sex: 0,
}
// 以上代码最终导出的是{ username: 'zs' }
```

**_案例 3：_**

```js
module.exports.username = 'zs'
exports.age = 18
// 以上代码最终导出的是{ username: 'zs', age: 18 }
```

> 注意引用对象的指向问题。

## 模块的加载机制

模块在第一次加载后会被缓存，这意味着多次调用 require()不会导致模块的代码被多次执行。

### 内置模块

内置模块的加载优先级最高。即使在 node_modules 目录下有名为 fs 的包，require('fs')始终返回的是 Nodejs 内置的 fs 模块。

### 自定义模块

自定义模块的加载依赖于路径标识符，如果没有指定./或../这样的路径标识符，require()加载时会把它当作内置模块或第三方模块加载，若此时找不到该模块，则抛出异常 `Error: Cannot find module 'xxx'`。如果省略了文件的扩展名，则 Nodejs 会按顺序分别尝试加载以下文件：

1. 按照确切的文件名加载
2. 补全.js 扩展名加载
3. 补全.json 扩展名加载
4. 补全.node 扩展名加载
5. 加载失败终端报错

### 第三方模块

第三方模块的加载时 Nodejs 会从当前模块的父目录开始，尝试从/node_modules 文件夹中加载第三方模块，如果未找到，则去上一级父目录中加载，直到文件系统的根目录。

> 注意：不论是内置模块、用户自定义模块还是第三方模块，都会优先从缓存中加载，从而提高模块的加载效率。

### 目录作为模块

当把目录作为模块标识符传递给 require()进行加载时，有三种情况：

1. 在被加载的目录下查找 package.json 文件，并寻找 main 属性作为 require()加载的入口；
2. 如果目录中无 package.json 文件，或者 main 入口不存在或无法解析，则 Nodejs 会尝试加载目录下的 index.js 文件；
3. 如果以上都无果，则 Nodejs 将会在终端打印错误信息，报告模块缺失。

## 最后

🌈Nodejs 基础系列，欢迎你来 🍭 多多交流，技术始于需求源于分享~

- [《Nodejs 基础——fs 模块》](https://juejin.cn/post/7058459564626149389)
- [《Nodejs 基础——path 模块》](https://juejin.cn/post/7059311448891228167/)
- [《Nodejs 基础——http 模块》](https://juejin.cn/post/7062239625699393567)
- [《Nodejs 基础——stream 模块》](https://juejin.cn/post/7062541118121967647)

**参考：**

[Nodejs 官方](http://nodejs.cn/learn/expose-functionality-from-a-nodejs-file-using-exports)、[Nodejs 模块系统教程](https://www.runoob.com/nodejs/nodejs-module-system.html)

> 如果有错别字或者不对的地方欢迎指出，将在第一时间改正，有更好的实现或想法希望留下你的评论 🔥
