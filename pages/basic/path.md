# Nodejs 基础——path 模块

## 前言

对于前端同学来说想学习全栈开发，Nodejs 无疑是一个很好的选择，学习了 Nodejs 我们就可以不依赖后端同学，自己开发一些东西，是的最近在学习小程序开发，但是想模拟一下登录授权的流程，这得依赖于后端同学，所以只能搁置或者在网上看一些相关文章，不能上手调试是非常之无奈的一件事，所以期望学习 nodejs 可以让我自己也可以玩很多东西~💪

## 概念

path 模块是 Nodejs 官方提供用来处理路径模块。它提供了一系列的方法和属性，用来满足用户对路径的处理需求。

无需安装，作为 Nodejs 核心组成部分，可以通过简单的引用来使用它。

```js
const path = require('path')
```

## path.basename(path[,ext])

用来从路径字符串中解析出文件名。

参数说明：

- path-<string> 必选，表示一个路径的字符串
- ext-<string> 可选，表示文件扩展名

返回<string>, 表示路径中的最后一部分

```js
const path = require('path')
const filePath = '/a/b/c/index.html'

const fullFileName = path.basename(filePath)
console.log(fullFileName) // 输出：index.html

const fileNameWithoutExt = path.basename(filePath, '.html')
console.log(fileNameWithoutExt) // 输出：index
```

## path.join(path)

用来将多个路径片段拼接成一个完整的路径字符串。

```js
const path = require('path')

const pathStr1 = path.join('/a', '/b/c/d', '../e')

console.log(pathStr1) //\a\b\c\e

const pathStr2 = path.join(__dirname, './demo.js')
console.log('当前文件所处目录：', pathStr2) //D:\lemon\Node\node-start\path\demo.js
```

注意：`../`会抵消前面的路径
现在如果再让我们读取文件的话，可以使用 path.join():

```js
// path/demo.js
const fs = require('fs')

fs.readFile(path.join(__dirname, '../fs/demo.txt'), 'utf-8', (err, data) => {
  if (err) {
    return console.log('读取文件失败：', err)
  }
  console.log('读取文件成功：', data)
})
```

### path.extname(path)

返回路径的扩展名部分。

```js
const path = require('path')
const filePath = '/a/b/c/index.html'
const fileExtName = path.extname(filePath)
console.log(fileExtName) // 输出：.html
```

### path.dirname(path)

返回路径的目录部分

```js
const path = require('path')
const filePath = '/a/b/c/index.html'
console.log(path.dirname(filePath)) // a/b/c
```

### 最后

参考：[nodejs 教程](http://nodejs.cn/learn/the-nodejs-path-module/#pathbasename)

> 如果有错别字或者不对的地方欢迎指出，将在第一时间改正，如果有更好的实现或想法希望留下你的评论 🔥
